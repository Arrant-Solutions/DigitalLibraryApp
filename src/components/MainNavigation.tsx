import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {useAppSelector, useAppDispatch} from 'redux/hooks'
import {selectAuth, restoreSession} from 'redux/slices/authSlice'
import AuthStack from './screens/auth/AuthStack'
import StartupError from './StartupError'

export type AuthStackParamList = {
  AuthHome: undefined
  Login: undefined
  Register: undefined
}

const MainNavigation = () => {
  const [error, setError] = useState(false)
  const {token} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  console.log('token =======> ', token)

  useEffect(() => {
    dispatch(restoreSession())
      .catch(() => setError(true))
      .finally(() => SplashScreen.hide())
  }, [])

  if (error) {
    return <StartupError />
  }

  return <AuthStack />
}

export default MainNavigation

const styles = StyleSheet.create({})
