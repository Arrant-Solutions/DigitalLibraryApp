import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import counterReducer from './slices/counterSlice'
import authReducer from './slices/authSlice'
// import agentsReducer from './slices/agentsSlice'
// import alertReducer from './slices/alertSlice'
// import appResourceReducer from './slices/appResourceSlice'
// import customerReducer from './slices/customerSlice'
// import SIMCardReducer from './slices/SIMCardSlice'
// import backOfficeReducer from './slices/backOfficeSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer
    // agents: agentsReducer,
    // alerts: alertReducer,
    // appResource: appResourceReducer,
    // customers: customerReducer,
    // SIMCards: SIMCardReducer,
    // backOffice: backOfficeReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
