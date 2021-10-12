import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Storage} from 'constants/storage'
import {fetchData} from 'redux/services'
import {ResourceItemT} from 'types/Resource'
import {IResourceCategory} from 'types/ResourceCategory'
import {getAsyncData} from 'utils/storage'
import {RootState} from '../store'

interface MediaResourceI {
  categories: Record<string, IResourceCategory[]>
  media: ResourceItemT[]
  errorMessage: string
  downloaded: ResourceItemT[]
  favorites: ResourceItemT[]
}

const initialState: MediaResourceI = {
  categories: {},
  media: [],
  errorMessage: '',
  downloaded: [],
  favorites: [],
}
/*
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
)*/

export const fetchMedia = createAsyncThunk('/media/home', async () => {
  const {data} = await fetchData<{
    media: ResourceItemT[]
    favorites: ResourceItemT[]
  }>('/resources/home')

  if (typeof data === 'object') {
    if (Array.isArray(data.favorites) && data.favorites.length) {
      return {
        ...initialState,
        media: data.media,
        favorites: data.favorites,
      }
    }

    const favorites = await getAsyncData<ResourceItemT[]>(
      Storage.FAVORITES_STORE,
    )
    if (Array.isArray(favorites)) {
      return {
        ...initialState,
        media: data.media,
        favorites: data.favorites,
      }
    }

    return {
      ...initialState,
      media: data.media,
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
    addFavorite: (state, action: PayloadAction<ResourceItemT>) => {
      console.log(action.payload)
      const found = state.favorites.find(
        ({resource_id}) => resource_id === action.payload.resource_id,
      )
      if (found) {
        state.favorites = [...state.favorites, action.payload]
      }
    },
    removeFavorite: (state, action: PayloadAction<ResourceItemT>) => {
      state.favorites = state.favorites.filter(
        ({resource_id}) => resource_id !== action.payload.resource_id,
      )
    },
  },
  extraReducers: {
    [fetchMedia.fulfilled.toString()]: (
      state,
      action: PayloadAction<MediaResourceI>,
    ) => {
      state.media = action.payload.media
      state.favorites = action.payload.favorites
      state.errorMessage = action.payload.errorMessage
    },
    // [addFavoriteResource.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<FavoriteItemT>,
    // ) => {
    //   state.favorites = [...state.favorites, action.payload]
    //   state.errorMessage = ''
    // },
    // [deleteFavoriteResource.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<IFavorite>,
    // ) => {
    //   state.favorites = state.favorites.filter(
    //     ({resource_id}) => resource_id !== action.payload.resource_id,
    //   )
    //   state.errorMessage = ''
    // },
  },
})

export const {setMedia, addFavorite, removeFavorite} =
  mediaResourceSlice.actions

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
