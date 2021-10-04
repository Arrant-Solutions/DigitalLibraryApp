import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {pcl} from 'components/screens/common/style'
import {StatusBarStyle} from 'react-native'
import {RootState} from '../store'

export type ThemeMode = 'purple' | 'gold'

const themes: Record<
  ThemeMode,
  {
    background: string
    text: string
    inactive: string
    active: string
    barStyle: StatusBarStyle
  }
> = {
  purple: {
    background: pcl.purple,
    text: pcl.black,
    active: pcl.gold,
    inactive: pcl.white,
    barStyle: 'light-content',
  },
  gold: {
    background: pcl.gold,
    text: pcl.black,
    active: pcl.purple,
    inactive: pcl.textPlaceholder,
    barStyle: 'dark-content',
  },
}

export interface ThemeSliceI {
  mode: ThemeMode
}

const initialState: ThemeSliceI = {
  mode: 'gold',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
  },
})

export const {setTheme} = themeSlice.actions

export const selectTheme = (state: RootState) => themes[state.theme.mode]

export default themeSlice.reducer
