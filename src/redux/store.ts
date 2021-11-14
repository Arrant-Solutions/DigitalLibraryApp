import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
// import resourcesReducer from './slices/resourceSlice'
import authReducer from './slices/authSlice'
import homeResourcesReducer from './slices/homeResourcesSlice'
import categoriesReducer from './slices/categoriesSlice'
import modalReducer from './slices/modalSlice'
import themeReducer from './slices/themeSlice'
import alertReducer from './slices/alertSlice'
import {resourcesApi} from './apis/resourceApi'
import {unauthenticatedMiddleware} from './middleware'
import mediaResourceReducer from './slices/mediaResourceSlice'

export const store = configureStore({
  reducer: {
    media: mediaResourceReducer,
    auth: authReducer,
    homeResources: homeResourcesReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    theme: themeReducer,
    alert: alertReducer,
    resources: resourcesApi.reducer,
    // media: mediaResourceApi.reducer,
  },
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: ['alert/setAlert'],
      },
    })
      .concat(resourcesApi.middleware)
      // .concat(mediaResourceApi.middleware)
      .concat([unauthenticatedMiddleware]), // not the cleanest solution
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
