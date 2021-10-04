import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import auth from '@react-native-firebase/auth'
import SplashScreen from 'react-native-splash-screen'
import {useAppSelector, useAppDispatch} from 'redux/hooks'
import {selectAuth, restoreSession} from 'redux/slices/authSlice'
import AuthStack from 'components/screens/auth/AuthStack'
// import DrawerContainer from 'components/screens/home/DrawerContainer'
import StartupError from 'components/StartupError'
import TabNavigator from './screens/main/TabNavigator'
import Skeleton from './Skeleton'

export type AuthStackParamList = {
  AuthHome: undefined
  Login: undefined
  Register: undefined
  Forgot: undefined
}

const MainNavigation = () => {
  const [error, setError] = useState(false)
  const {token, user} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const [initializing, setInitializing] = useState(true)

  // Handle user state changes
  const onAuthStateChanged = async (user: any) => {
    SplashScreen.hide()
    // if (user) setUser(user)
    // else {
    //   // await dispatch(restoreSession()).catch(() => setError(true))
    // }
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) {
    return <Skeleton />
  }

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
