import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GENERIC_SERVER_ERROR} from '../../constants/errors'
import {CategoryI} from '../../types/Category'
import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData,
} from '../../utils/storage'
import {categories, data} from '../services/data'
import {RootState} from '../store'

export interface CategoriesSliceI {
  categories: CategoryI[]
  errorMessage: string
}

const initialState: CategoriesSliceI = {
  categories: [],
  errorMessage: '',
}

export const fetchCategories = createAsyncThunk('categories/all', async () => {
  return {
    categories,
    errorMessage: '',
  }
  // const { payload } = await getCategories()

  // if (Array.isArray(payload)) {
  //   return { ...initialState, categories: payload }
  // }

  // return {
  //   ...initialState,
  //   errorMessage: payload
  // }
})

export const fetchCategoryItems = createAsyncThunk(
  'categories/perItem',
  async (categoryID: number) => {
    return data.map(({description, alt_description, urls, user: {name}}) => ({
      title: description || alt_description || name,
      description: description || alt_description || name,
      thumbnail: urls.thumb,
      id: Math.floor(Math.random() * 1000),
      type: 'video',
      duration: Math.floor(Math.random() * 200),
      genre: 'string',
      url: 'local',
      author: 'Pastor Choolwe',
    }))
  },
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryI[]>) => {
      state.categories = action.payload
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled.toString()]: (
      state,
      action: PayloadAction<CategoriesSliceI>,
    ) => {
      const {categories, errorMessage} = action.payload
      state.categories = categories
      state.errorMessage = errorMessage
    },
  },
})

export const {setCategories} = categoriesSlice.actions

export const selectCategories = (state: RootState): CategoriesSliceI =>
  state.categories

export default categoriesSlice.reducer
