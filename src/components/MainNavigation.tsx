import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message'
import {useNetInfo} from '@react-native-community/netinfo'
import {useAppSelector, useAppDispatch} from 'redux/hooks'
import {refreshToken, selectAuth, setUserDetails} from 'redux/slices/authSlice'
import AuthStack from 'components/screens/auth/AuthStack'

// import DrawerContainer from 'components/screens/home/DrawerContainer'
import StartupError from 'components/StartupError'
import TabNavigator from './screens/main/TabNavigator'
import Skeleton from './Skeleton'
import {createStackNavigator} from '@react-navigation/stack'
import {ResourceItemT} from 'types/Resource'
import MediaPlayer from './screens/main/MediaPlayer'
import PDFViewer from './screens/main/PDFViewer'
import Category from './screens/main/Category'
import AlertDialog from './screens/common/AlertDialog'

export type AuthStackParamList = {
  AuthHome: undefined
  Login: undefined
  Register: undefined
  Forgot: undefined
}

export type BaseParamList = {
  TabNavigator: undefined
  'Media Player': {resource: ResourceItemT}
  'PDF Viewer': {resource: ResourceItemT}
  Category: {
    id: string | number
    name: string
  }
}

const Stack = createStackNavigator<BaseParamList>()

const MainNavigation = () => {
  const {isInternetReachable} = useNetInfo()
  const [error, setError] = useState(false)
  const {token, user} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const [initializing, setInitializing] = useState(true)

  // console.log('token  ============>  ', token)

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
    await dispatch(refreshToken(isInternetReachable))
      .then((res: any) => {
        setError(false)
      })
      .catch(() => setError(true))
      .finally(() => setInitializing(false))
    // if (initializing) setInitializing(false)
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

  if (Boolean(token) && !user.has_missing) {
    return (
      <>
        <Stack.Navigator
          initialRouteName="TabNavigator"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Media Player" component={MediaPlayer} />
          <Stack.Screen name="PDF Viewer" component={PDFViewer} />
          <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
        <Toast ref={ref => Toast.setRef(ref)} />
      </>
    )
  }

  return <AuthStack />
}

export default MainNavigation

const styles = StyleSheet.create({})
