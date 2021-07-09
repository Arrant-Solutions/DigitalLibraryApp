import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import {
  AUTH_TOKEN,
  COUNTRIES_TOKEN,
  GENDERS_STORE,
  USER_STORE
} from '../../constants/storage'
import { CountryI } from '../../models/country'
import { GenderI } from '../../models/gender'
import { HomeMediaItem } from '../../models/media'
import { GenericUser, GenericUserI, UserCredential } from '../../models/user'
import { login as userLogin } from '../../services/auth'
import { getLatestReleases } from '../../services/homeResources'
import { getCountries, getGenders } from '../../services/resources'
import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData
} from '../../utils/storage'
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
    const { payload } = await getLatestReleases()

    if (Array.isArray(payload)) {
      return { ...initialState, latest: payload }
    }

    return {
      ...initialState,
      errorMessage: payload
    }
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

      storeAsyncData('LATEST_RELEASE', latest)
    },
    [fetchLatest.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    }
  }
})

export const { setSuggestions, setLatest } = homeResourceSlice.actions

export const selectHomeResources = (state: RootState): HomeResourceSliceI =>
  state.homeResources

export default homeResourceSlice.reducer
