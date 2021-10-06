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

    return next(action)
  }
