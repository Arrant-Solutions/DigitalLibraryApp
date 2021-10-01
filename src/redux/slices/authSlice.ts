import {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Storage} from 'constants/storage'
import {deserialize} from 'utils'
import {GENERIC_SERVER_ERROR} from '../../constants/errors'
import {GenericUser, GenericUserI} from '../../types/User'
import {deleteAsyncData, getAsyncData} from '../../utils/storage'
import {RootState} from '../store'

export interface AuthSliceI {
  credential?: FirebaseAuthTypes.UserCredential
  synced: boolean
  user: GenericUserI
  token: string
  errorMessage: string
}

const initialState: AuthSliceI = {
  credential: undefined,
  synced: false,
  user: GenericUser.createReduxInstance(),
  token: '',
  errorMessage: '',
}

export const restoreSession = createAsyncThunk('user/restore', async () => {
  const token = await getAsyncData<string>(Storage.AUTH_TOKEN)
  const user = await getAsyncData<GenericUserI>(Storage.USER_STORE)

  return {
    token,
    user,
    errorMessage: '',
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      deleteAsyncData(Storage.AUTH_TOKEN)
      deleteAsyncData(Storage.USER_STORE)

      state.user = GenericUser.createReduxInstance()
      state.token = ''
    },
    setUser: (state, action: PayloadAction<GenericUserI>) => {
      state.user = deserialize(action.payload)
    },
    setUserDetails: (state, action: PayloadAction<Partial<GenericUser>>) => {
      state.user = {...state.user, ...action.payload}
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setSynced: (state, action: PayloadAction<boolean>) => {
      state.synced = action.payload
    },
    setCredential: (
      state,
      action: PayloadAction<FirebaseAuthTypes.UserCredential>,
    ) => {
      state.credential = action.payload
    },
  },
  extraReducers: {
    [restoreSession.fulfilled.toString()]: (
      state,
      action: PayloadAction<AuthSliceI>,
    ) => {
      const {user, token, errorMessage} = action.payload
      state.user = user ? deserialize(user) : initialState.user
      state.token = token
      state.errorMessage = errorMessage
    },
    [restoreSession.rejected.toString()]: state => {
      state.errorMessage = GENERIC_SERVER_ERROR
    },
  },
})

export const {
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
