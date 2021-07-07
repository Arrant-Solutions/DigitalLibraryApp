import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import { AUTH_TOKEN, USER_STORE } from '../../constants/storage'
import { GenericUser, GenericUserI, UserCredential } from '../../models/user'
import { login as userLogin } from '../../services/auth'
import {
  deleteAsyncData,
  getAsyncData,
  storeAsyncData
} from '../../utils/storage'
import { RootState } from '../store'

export interface AuthSliceI {
  user: GenericUserI
  token: string
  errorMessage: string
}

const initialState: AuthSliceI = {
  user: GenericUser.createReduxInstance(),
  token: '',
  errorMessage: ''
}

export const login = createAsyncThunk(
  'user/login',
  async (credential: UserCredential) => {
    const { success, payload } = await userLogin(credential)

    if (success && typeof payload === 'object') {
      const { token, user } = payload
      axios.defaults.headers.common.authorization = `Bearer ${token}`

      return { token, user, errorMessage: '' }
    }

    return {
      ...initialState,
      errorMessage: payload as string
    }
  }
)

export const restoreSession = createAsyncThunk('user/restore', async () => {
  const token = await getAsyncData<string>(AUTH_TOKEN)
  const user = await getAsyncData<GenericUserI>(USER_STORE)

  return {
    token,
    user,
    errorMessage: ''
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      deleteAsyncData(AUTH_TOKEN)
      deleteAsyncData(USER_STORE)

      state.user = GenericUser.createReduxInstance()
      state.token = ''
    },
    setUser: (state, action: PayloadAction<GenericUserI>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  },
  extraReducers: {
    [login.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>
    ) => {
      const { user, token, errorMessage } = action.payload

      storeAsyncData(AUTH_TOKEN, token)
      storeAsyncData(USER_STORE, JSON.stringify(user))

      state.user = user
      state.token = token
      state.errorMessage = errorMessage
    },
    [login.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [restoreSession.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>
    ) => {
      const { user, token, errorMessage } = action.payload
      state.user = user
      state.token = token
      state.errorMessage = errorMessage
    },
    [restoreSession.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    }
  }
})

export const { logout, setUser, setToken } = authSlice.actions

export const selectAuth = (state: RootState): AuthSliceI => state.auth

export default authSlice.reducer
