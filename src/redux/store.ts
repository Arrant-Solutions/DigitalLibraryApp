import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
// import resourcesReducer from './slices/resourceSlice'
import authReducer from './slices/authSlice'
import homeResourcesReducer from './slices/homeResourcesSlice'
import categoriesReducer from './slices/categoriesSlice'
import modalReducer from './slices/modalSlice'
import {resourcesApi} from './services/resourceService'

export const store = configureStore({
  reducer: {
    // resources: resourcesReducer,
    auth: authReducer,
    homeResources: homeResourcesReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    resources: resourcesApi.reducer,
  },
  middleware: gDM => gDM().concat(resourcesApi.middleware), // not the cleanest solution
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
