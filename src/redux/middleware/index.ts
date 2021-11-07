import {isFulfilled, Middleware} from '@reduxjs/toolkit'
import {Storage} from 'constants/storage'
import {storeAsyncData} from 'utils/storage'

export const unauthenticatedMiddleware: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (
      action &&
      ((/^user/.test(action.type) && isFulfilled(action)) ||
        /^auth/.test(action.type)) // social login does not have a fulful
    ) {
      // console.log('running store middleware.....', typeof action.payload)
      storeAsyncData(Storage.AUTH_STORAGE, action.payload)
    }
    if (action && /^media\/(add|remove)Favorite/.test(action.type)) {
      // console.log(action, action.payload)
      storeAsyncData(Storage.FAVORITES_STORE, action.payload)

      // sync with server and what not
    }

    return next(action)
  }
