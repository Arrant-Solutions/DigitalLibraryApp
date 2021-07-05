import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AUTH_HOME, LOGIN, SIGN_UP } from '../../constants/screens'
import AuthHome from '../screens/auth/AuthHome'
import Login from '../screens/auth/Login'
import Signup from '../screens/auth/Signup'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_HOME}
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerLeft: () => <></>
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={AUTH_HOME}
        component={AuthHome}
      />
      <Stack.Screen name={SIGN_UP} component={Signup} />
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})
