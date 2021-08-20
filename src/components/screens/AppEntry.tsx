import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectAuth, restoreSession } from '../../redux/slices/authSlice'
import AuthStack from '../navigation/AuthStack'
import HomeStack from '../navigation/HomeStack'
import StartupError from './StartupError'

const AppEntry = () => {
  const [error, setError] = useState(false)
  const { token } = useAppSelector(selectAuth)
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

  if (typeof token === 'string' && token.length > 20) {
    return <HomeStack />
  }

  console.log('here thus far')
  return <AuthStack />
}

export default AppEntry

const styles = StyleSheet.create({})
