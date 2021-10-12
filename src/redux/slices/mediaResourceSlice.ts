import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {deleteData, fetchData, postData} from 'redux/services'
import {FavoriteCreateT, FavoriteItemT, IFavorite} from 'types/Favorite'
import {ResourceItemT} from 'types/Resource'
import {IResourceCategory} from 'types/ResourceCategory'
import {RootState} from '../store'

interface MediaResourceI {
  categories: Record<string, IResourceCategory[]>
  media: ResourceItemT[]
  errorMessage: string
  downloaded: ResourceItemT[]
  favorites: FavoriteItemT[]
}

const initialState: MediaResourceI = {
  categories: {},
  media: [],
  errorMessage: '',
  downloaded: [],
  favorites: [],
}

export const addFavoriteResource = createAsyncThunk(
  '/media/addFavorite',
  async (resource: ResourceItemT) => {
    console.log('here.....')
    const {data} = await postData<IFavorite, FavoriteCreateT>('/favorites', {
      user_id: resource.user_id,
      resource_id: resource.resource_id,
    })
    console.log('here.....', data)

    if (typeof data === 'object') {
      return {...resource, ...data}
    }

    throw new Error(data)
  },
)

export const deleteFavoriteResource = createAsyncThunk(
  '/media/deleteFavorite',
  async (favorite_id: number) => {
    const {data} = await deleteData<IFavorite>(`/favorites/${favorite_id}`)

    if (typeof data === 'object') {
      return data
    }

    throw new Error(data)
  },
)

export const fetchMedia = createAsyncThunk('/media/home', async () => {
  const {data} = await fetchData<{
    media: ResourceItemT[]
    favorites: ResourceItemT[]
  }>('/resources/home')

  if (typeof data === 'object') {
    return {
      ...initialState,
      media: data.media,
      favorites: data.favorites,
    }
  }

  return {...initialState, errorMessage: data}
})

export const mediaResourceSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia: (state, action: PayloadAction<ResourceItemT[]>) => {
      state.media = action.payload
    },

    // setCategories: (state, action: PayloadAction<IResourceCategory[]>) => {
    //   state.categories = action.payload
    // },
  },
  extraReducers: {
    [fetchMedia.fulfilled.toString()]: (
      state,
      action: PayloadAction<MediaResourceI>,
    ) => {
      state.media = action.payload.media
      state.favorites = action.payload.favorites
      //   state.categories = action.payload.categories
      state.errorMessage = action.payload.errorMessage
    },
    [addFavoriteResource.fulfilled.toString()]: (
      state,
      action: PayloadAction<FavoriteItemT>,
    ) => {
      state.favorites = [...state.favorites, action.payload]
      state.errorMessage = ''
    },
    [deleteFavoriteResource.fulfilled.toString()]: (
      state,
      action: PayloadAction<IFavorite>,
    ) => {
      state.favorites = state.favorites.filter(
        ({resource_id}) => resource_id !== action.payload.resource_id,
      )
      state.errorMessage = ''
    },
  },
})

export const {setMedia} = mediaResourceSlice.actions

export const selectMedia = (state: RootState) => ({
  ...state.media,
  categories: {
    ...state.media.media.reduce((acc, item) => {
      if (acc[item.resource_category_name]) {
        acc[item.resource_category_name].push(item)
      } else {
        acc[item.resource_category_name] = [item]
      }

      return acc
    }, {} as Record<string, ResourceItemT[]>),
    Downloaded: state.media.downloaded,
    favorites: state.media.favorites,
  } as Record<string, ResourceItemT[]>,
})

export default mediaResourceSlice.reducer
