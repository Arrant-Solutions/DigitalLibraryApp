import {createStackNavigator} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import React from 'react'
import {StyleSheet} from 'react-native'
import {pcl} from '../common/style'
import AuthHome from './AuthHome'
import EmailSignup from './EmailSignup'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import Signup from './Signup'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AuthHome'}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: pcl.purple,
        },
        headerTintColor: pcl.background,
        // headerLeft: () => <></>
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'AuthHome'}
        component={AuthHome}
      />
      <Stack.Screen name={'Register'} component={Signup} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Forgot'} component={ForgotPassword} />
      <Stack.Screen name={'Email Signup'} component={EmailSignup} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})
