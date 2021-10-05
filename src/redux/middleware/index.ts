import {isFulfilled, Middleware} from '@reduxjs/toolkit'
import {Storage} from 'constants/storage'
import {storeAsyncData} from 'utils/storage'

export const unauthenticatedMiddleware: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (/^user/.test(action.type) && isFulfilled(action)) {
      storeAsyncData(Storage.AUTH_STORAGE, action.payload)
    }

    return next(action)
  }
