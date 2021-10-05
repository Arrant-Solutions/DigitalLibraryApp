import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import SplashScreen from 'react-native-splash-screen'
import {useNetInfo} from '@react-native-community/netinfo'
import {useAppSelector, useAppDispatch} from 'redux/hooks'
import {refreshToken, selectAuth, setUserDetails} from 'redux/slices/authSlice'
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
  const {isInternetReachable} = useNetInfo()
  const [error, setError] = useState(true)
  const {token, user} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const [initializing, setInitializing] = useState(true)

  // Handle user state changes
  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    SplashScreen.hide()
    if (user) {
      const names = (user.displayName || '').split(' ')
      setUserDetails({
        email: String(user.email),
        first_name: names[0],
        last_name: names.length > 1 ? names[1] : names[0],
      })
    }
    await dispatch(refreshToken(isInternetReachable)).catch(() =>
      setError(true),
    )
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [isInternetReachable])

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
