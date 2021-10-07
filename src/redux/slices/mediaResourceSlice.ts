import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchData} from 'redux/services'
import {ResourceItemT} from 'types/Resource'
import {IResourceCategory} from 'types/ResourceCategory'
import {RootState} from '../store'

interface MediaResourceI {
  categories: Record<string, IResourceCategory[]>
  media: ResourceItemT[]
  errorMessage: string
  downloaded: ResourceItemT[]
  playlist: ResourceItemT[]
}

const initialState: MediaResourceI = {
  categories: {},
  media: [],
  errorMessage: '',
  downloaded: [],
  playlist: [],
}

export const fetchMedia = createAsyncThunk('/media/home', async () => {
  const {data} = await fetchData<ResourceItemT[]>('/resources/home')

  if (typeof data === 'object') {
    return {
      ...initialState,
      media: data,
    }
  }

  return {...initialState, errorMessage: data}
})

export const mediaResourceSlice = createSlice({
  name: 'theme',
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
      //   state.categories = action.payload.categories
      state.errorMessage = action.payload.errorMessage
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
    Playlist: state.media.playlist,
  } as Record<string, ResourceItemT[]>,
})

export default mediaResourceSlice.reducer
