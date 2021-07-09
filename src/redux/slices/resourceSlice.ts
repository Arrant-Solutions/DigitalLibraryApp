import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import { COUNTRIES_TOKEN, GENDERS_STORE } from '../../constants/storage'
import { CountryI } from '../../models/country'
import { GenderI } from '../../models/gender'
import { getCountries, getGenders } from '../../services/resources'
import { getAsyncData } from '../../utils/storage'
import { RootState } from '../store'

export interface ResourceSliceI {
  genders: GenderI[]
  countries: CountryI[]
  errorMessage: string
}

const initialState: ResourceSliceI = {
  genders: [],
  countries: [],
  errorMessage: ''
}

export const fetchCountries = createAsyncThunk(
  'resources/countries',
  async () => {
    const { payload } = await getCountries()
    console.log('countries: ', payload.length)

    if (Array.isArray(payload)) {
      return { ...initialState, countries: payload }
    }

    return {
      ...initialState,
      errorMessage: payload
    }
  }
)

export const fetchGenders = createAsyncThunk('resources/genders', async () => {
  const { payload } = await getGenders()

  if (Array.isArray(payload)) {
    return { ...initialState, genders: payload }
  }

  return {
    ...initialState,
    errorMessage: payload
  }
})

export const restoreResources = createAsyncThunk(
  'resource/restore',
  async (): Promise<ResourceSliceI> => {
    const countries = await getAsyncData<CountryI[]>(COUNTRIES_TOKEN)
    const genders = await getAsyncData<GenderI[]>(GENDERS_STORE)

    if (Array.isArray(countries) && Array.isArray(genders)) {
      return {
        countries,
        genders,
        errorMessage: ''
      }
    }

    return initialState
  }
)

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setGenders: (state, action: PayloadAction<GenderI[]>) => {
      state.genders = action.payload
    },
    setCountries: (state, action: PayloadAction<CountryI[]>) => {
      state.countries = action.payload
    }
  },
  extraReducers: {
    [fetchGenders.fulfilled.toString()]: (
      state,
      action: PayloadAction<ResourceSliceI>
    ) => {
      const { genders, errorMessage } = action.payload
      state.genders = genders
      state.errorMessage = errorMessage
    },
    [fetchGenders.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [fetchCountries.fulfilled.toString()]: (
      state,
      action: PayloadAction<ResourceSliceI>
    ) => {
      const { countries, errorMessage } = action.payload
      state.countries = countries
      state.errorMessage = errorMessage
    },
    [fetchCountries.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [restoreResources.fulfilled.toString()]: (
      state,
      action: PayloadAction<ResourceSliceI>
    ) => {
      const { genders, countries, errorMessage } = action.payload
      state.genders = genders
      state.countries = countries
      state.errorMessage = errorMessage
    },
    [restoreResources.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    }
  }
})

export const { setCountries, setGenders } = resourceSlice.actions

export const selectResources = (state: RootState): ResourceSliceI =>
  state.resources

export default resourceSlice.reducer
