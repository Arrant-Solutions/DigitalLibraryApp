import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ModalSliceI {
  visible: boolean
}

const initialState: ModalSliceI = {
  visible: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload
    }
  }
})

export const { setVisible } = modalSlice.actions

export const selectModal = (state: RootState): ModalSliceI => state.modal

export default modalSlice.reducer
