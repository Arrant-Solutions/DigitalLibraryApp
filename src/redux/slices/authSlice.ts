import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {Storage} from 'constants/storage'
import {fetchData, postData} from 'redux/services'
import {emailPasswordLogin} from 'redux/services/auth'
import {IFbCredential} from 'types'
import {deserialize} from 'utils'
import {GENERIC_SERVER_ERROR} from '../../constants/errors'
import {GenericUser, GenericUserI, UserCredential} from '../../types/User'
import {deleteAsyncData, getAsyncData} from '../../utils/storage'
import {RootState} from '../store'

export interface AuthSliceI {
  credential?: {
    refreshToken: string
    uid: string
  }
  synced: boolean
  user: GenericUserI
  token: string
  errorMessage: string
}

const initialState: AuthSliceI = {
  credential: {
    refreshToken: '',
    uid: '',
  },
  synced: false,
  user: GenericUser.createReduxInstance(),
  token: '',
  errorMessage: '',
}

export const login = createAsyncThunk(
  'user/login',
  async (credential: UserCredential) => {
    const {data} = await emailPasswordLogin(credential)

    if (typeof data === 'string') {
      return {
        ...initialState,
        errorMessage: data,
      }
    }

    const {data: userData, statusCode} = await fetchData<{
      user: GenericUserI
      token: string
    }>(`/auth/fetchUser/${data.email}`)

    if (typeof userData === 'string') {
      if (statusCode === 404) {
        return {
          ...initialState,
          credential: data,
          user: {
            ...initialState.user,
            email: credential.email,
          },
          errorMessage:
            'Registration incomplete. Please complete your registration.',
        }
      }
      return {
        ...initialState,
        errorMessage: userData,
      }
    }

    return {
      user: userData.user,
      token: userData.token,
      errorMessage: '',
      credential: data,
      synced: true,
    }
  },
)

export const refreshToken = createAsyncThunk(
  'user/restoreToken',
  async (online: boolean | null) => {
    const storageData = await getAsyncData<AuthSliceI>(Storage.AUTH_STORAGE)
    // console.log(JSON.stringify({...storageData, online}, null, 2))

    if (storageData) {
      axios.defaults.headers.common.authorization = `Bearer ${storageData.token}`
      if (online) {
        const {data} = await postData<{user: GenericUserI; token: string}, {}>(
          '/auth/refreshToken',
          {},
          {headers: {token: storageData.token}},
        )

        // console.log(JSON.stringify(data, null, 2))

        if (typeof data === 'object') {
          axios.defaults.headers.common.authorization = `Bearer ${data.token}`

          return {
            ...initialState,
            errorMessage: '',
            token: data.token,
            user: data.user,
          }
        }

        return {
          ...initialState,
          token: storageData.token,
          errorMessage: data,
        }
      }

      return storageData
    }

    return {
      ...initialState,
      errorMessage: 'failed to fetch resources',
    }
  },
)

export const restoreSession = createAsyncThunk('user/restore', async () => {
  const auth = await getAsyncData<AuthSliceI>(Storage.AUTH_STORAGE)

  if (auth) {
    return auth
  }

  return initialState
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<Partial<AuthSliceI>>) => {
      const {credential, synced, user, token, errorMessage} = action.payload

      state.credential = credential || state.credential
      state.synced = typeof synced === 'boolean' ? synced : state.synced
      state.user = deserialize(user) || state.user
      state.token = token || state.token
      state.errorMessage = errorMessage || state.errorMessage
    },
    logout: state => {
      // deleteAsyncData(Storage.AUTH_STORAGE)

      state.user = initialState.user
      state.token = ''
      state.credential = undefined
      state.synced = false
      state.errorMessage = ''
    },
    setUser: (state, action: PayloadAction<GenericUserI>) => {
      action.payload.password = ''
      state.user = deserialize<GenericUserI>(action.payload)
    },
    setUserDetails: (state, action: PayloadAction<Partial<GenericUser>>) => {
      state.user = {
        ...state.user,
        ...deserialize<Partial<GenericUser>>(action.payload),
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setSynced: (state, action: PayloadAction<boolean>) => {
      state.synced = action.payload
    },
    setCredential: (state, action: PayloadAction<IFbCredential>) => {
      state.credential = action.payload
    },
  },
  extraReducers: {
    [restoreSession.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>,
    ) => {
      const {credential, synced, user, token, errorMessage} = action.payload

      state.credential = credential
      state.synced = typeof synced === 'boolean' ? synced : false
      state.user = user ? deserialize(user) : initialState.user
      state.token = token
      state.errorMessage = errorMessage
    },
    [restoreSession.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [login.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>,
    ) => {
      const {credential, synced, user, token, errorMessage} = action.payload

      state.credential = credential
      state.synced = typeof synced === 'boolean' ? synced : false
      state.user = user ? deserialize(user) : initialState.user
      state.token = token
      state.errorMessage = errorMessage
    },
    [login.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
    [refreshToken.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>,
    ) => {
      const {user, token, errorMessage} = action.payload

      state.user = user ? deserialize(user) : initialState.user
      state.token = token
      // console.log('setting token.............................', token)
      state.errorMessage = errorMessage

      if (token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`
      }
    },
    [refreshToken.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
  },
})

export const {
  updateAuth,
  logout,
  setUser,
  setToken,
  setSynced,
  setUserDetails,
  setCredential,
} = authSlice.actions

export const selectAuth = ({auth}: RootState): AuthSliceI => ({
  ...auth,
  user: new GenericUser(auth.user),
})

export default authSlice.reducer
