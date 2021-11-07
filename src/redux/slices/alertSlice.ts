import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'redux/store'

export interface ActionButtonI {
  text: string
  onPress?: () => void
}

export interface AlertSliceI {
  title: string
  message: string
  buttons?: ActionButtonI[]
  cancelable?: boolean
}

const initialState: AlertSliceI = {
  title: '',
  message: '',
  cancelable: true,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertSliceI>) => {
      state.message = action.payload.message
      state.title = action.payload.title
      state.cancelable = action.payload.cancelable
      state.buttons = action.payload.buttons
    },
    clearAlert: state => {
      state.message = ''
      state.title = ''
      state.cancelable = true
      state.buttons = undefined
    },
  },
})

export const {setAlert, clearAlert} = alertSlice.actions

export const selectAlert = ({alert}: RootState): AlertSliceI => alert

export default alertSlice.reducer
