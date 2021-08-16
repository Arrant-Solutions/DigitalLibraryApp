import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import { HomeMediaItem } from '../../models/media'
import { getAsyncData, storeAsyncData } from '../../utils/storage'
import { data } from '../services/data'
import { RootState } from '../store'

export interface HomeResourceSliceI {
  latest: HomeMediaItem[]
  suggestions: HomeMediaItem[]
  mostPlayed: HomeMediaItem[]
  errorMessage: string
}

const initialState: HomeResourceSliceI = {
  latest: [],
  suggestions: [],
  mostPlayed: [],
  errorMessage: ''
}

export const fetchLatest = createAsyncThunk(
  'homeResources/latest',
  async () => {
    console.log('getting')
    const latest = data.map(
      ({ description, alt_description, urls, user: { name } }) => ({
        title: description || alt_description || name,
        thumbnail: urls.thumb
      })
    )

    return { latest, errorMessage: '' }
    // const { payload } = await getLatestReleases()

    // if (Array.isArray(payload)) {
    //   return { ...initialState, latest: payload }
    // }

    // return {
    //   ...initialState,
    //   errorMessage: payload
    // }
  }
)

export const restoreLatest = createAsyncThunk(
  'homeResources/restore',
  async () => {
    // await deleteAsyncData('LATEST_RELEASE')
    const latest = await getAsyncData<HomeMediaItem[]>('LATEST_RELEASE')

    if (Array.isArray(latest)) {
      return { ...initialState, latest }
    }

    return initialState
  }
)

export const homeResourceSlice = createSlice({
  name: 'homeResources',
  initialState,
  reducers: {
    setLatest: (state, action: PayloadAction<HomeMediaItem[]>) => {
      state.latest = action.payload
    },
    setSuggestions: (state, action: PayloadAction<HomeMediaItem[]>) => {
      state.suggestions = action.payload
    }
  },
  extraReducers: {
    [fetchLatest.fulfilled.toString()]: (
      state,
      action: PayloadAction<HomeResourceSliceI>
    ) => {
      const { latest, errorMessage } = action.payload
      state.latest = latest
      state.errorMessage = errorMessage
      console.log(latest)

      storeAsyncData('LATEST_RELEASE', latest)
    },
    [fetchLatest.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [restoreLatest.fulfilled.toString()]: (
      state,
      action: PayloadAction<HomeResourceSliceI>
    ) => {
      const { latest, errorMessage } = action.payload
      state.latest = latest
      state.errorMessage = errorMessage

      storeAsyncData('LATEST_RELEASE', latest)
    }
  }
})

export const { setSuggestions, setLatest } = homeResourceSlice.actions

export const selectHomeResources = (state: RootState): HomeResourceSliceI =>
  state.homeResources

export default homeResourceSlice.reducer
