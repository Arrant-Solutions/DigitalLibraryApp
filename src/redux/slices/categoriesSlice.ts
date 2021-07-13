import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import { CategoryI } from '../../models/category'
import { fetchCategories as getCategories } from '../../services/categories'
import { categories } from '../../services/data'
import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData
} from '../../utils/storage'
import { RootState } from '../store'

export interface CategoriesSliceI {
  categories: CategoryI[]
  errorMessage: string
}

const initialState: CategoriesSliceI = {
  categories: [],
  errorMessage: ''
}

export const fetchCategories = createAsyncThunk('categories/all', async () => {
  const { payload } = await getCategories()

  if (Array.isArray(payload)) {
    return { ...initialState, categories: payload }
  }

  return {
    ...initialState,
    errorMessage: payload
  }
})

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryI[]>) => {
      state.categories = action.payload
    }
  },
  extraReducers: {
    [fetchCategories.fulfilled.toString()]: (
      state,
      action: PayloadAction<CategoriesSliceI>
    ) => {
      const { categories, errorMessage } = action.payload
      state.categories = categories
      state.errorMessage = errorMessage
    }
  }
})

export const { setCategories } = categoriesSlice.actions

export const selectCategories = (state: RootState): CategoriesSliceI =>
  state.categories

export default categoriesSlice.reducer
