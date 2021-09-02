import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {useAppSelector, useAppDispatch} from 'redux/hooks'
import {selectAuth, restoreSession} from 'redux/slices/authSlice'
import {fetchCountries, fetchGenders} from 'redux/slices/resourceSlice'
import AuthStack from 'components/screens/auth/AuthStack'
// import DrawerContainer from 'components/screens/home/DrawerContainer'
import StartupError from 'components/StartupError'
import TabNavigator from './screens/main/TabNavigator'

export type AuthStackParamList = {
  AuthHome: undefined
  Login: undefined
  Register: undefined
}

const MainNavigation = () => {
  const [error, setError] = useState(false)
  const {token} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await dispatch(restoreSession()).catch(() => setError(true))
        await dispatch(fetchCountries()).catch(() => setError(true))
        await dispatch(fetchGenders()).catch(() => setError(true))
        SplashScreen.hide()
      } catch (err) {
        setError(true)
        SplashScreen.hide()
      }
    }

    bootstrap()
  }, [])

  if (error) {
    return <StartupError />
  }

  if (token) {
    return <TabNavigator />
  }

  return <AuthStack />
}

export default MainNavigation

const styles = StyleSheet.create({})
