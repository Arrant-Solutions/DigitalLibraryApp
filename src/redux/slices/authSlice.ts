import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GENERIC_SERVER_ERROR } from '../../constants/errors'
import { AUTH_TOKEN, USER_STORE } from '../../constants/storage'
import { GenericUser, GenericUserI, UserCredential } from '../../models/user'
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
    // const { success, payload } = await userLogin(credential)

    const { user, token } = {
      // statusCode?
      user: {
        firstName: 'Pablo',
        lastName: 'Miyuru',
        username: 'sg1290',
        email: 'Pablo.Miyuru@domain.co.zm',
        dateOfBirth: '1990-10-31',
        gender: {
          genderID: 1,
          genderName: 'Male'
        },
        country: {
          countryID: 1,
          countryName: 'Angola'
        },
        branch: {
          branchID: 1,
          branchName: 'Chadleigh Branch'
        }
      },
      token:
        'eyJhbGciOixhc3RfbmFtZSI6Ik1JIUzI1J9.eyJmaXJzdF9uYW1lIjoiV2lsbGlhbSIsImvb25nYSIsInVzZXJuYW1lIjoiZ24xMzc2IiwiZW1haWwiOnsidmFsdWUiOiJXaWxsaWFtLk1vb25nYUB6YW10ZWwuY28uem0ifSwidXNlcl9sZXZlbCI6ImFkbWluIiwiYnVsa3Ntc19hZG1pbiI6dHJ1ZSwiNiIsInR5cCI6IkpXVCc3RhdHVzIjoxLCJpYXQiOjE2MDY3MjUzMzQsImV4cCI6MTYwNjc1NDEzNCwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAwIn0.mTCIL3ImkMat2q4LiVfQF-LzQKxGPjpY8vRPZtyLhQQ'
      // }
    }

    return { token, user, errorMessage: '' }

    // if (success && typeof payload === 'object') {
    //   const { token, user } = payload
    //   axios.defaults.headers.common.authorization = `Bearer ${token}`

    //   return { token, user, errorMessage: '' }
    // }

    // return {
    //   ...initialState,
    //   errorMessage: payload as string
    // }
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
      storeAsyncData(USER_STORE, user)

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
      state.user = user ? user : initialState.user
      state.token = token
      state.errorMessage = errorMessage
    },
    [restoreSession.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    }
  }
})

export const { logout, setUser, setToken } = authSlice.actions

export const selectAuth = ({ auth }: RootState): AuthSliceI => ({
  ...auth,
  user: new GenericUser(auth.user)
})

export default authSlice.reducer
