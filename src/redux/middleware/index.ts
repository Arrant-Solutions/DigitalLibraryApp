import {isFulfilled, Middleware} from '@reduxjs/toolkit'
import {Storage} from 'constants/storage'
import {storeAsyncData} from 'utils/storage'

export const unauthenticatedMiddleware: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (action && /^user/.test(action.type) && isFulfilled(action)) {
      // console.log('running store middleware.....', action.payload.token)
      storeAsyncData(Storage.AUTH_STORAGE, action.payload)
    }
    if (action && /^media\/(add|remove)Favorite/.test(action.type)) {
      storeAsyncData(Storage.FAVORITES_STORE, action.payload)

      // sync with server and what not
    }

    return next(action)
  }
