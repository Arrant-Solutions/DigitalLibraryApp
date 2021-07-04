import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AUTH_HOME } from '../../constants/screens'
import AuthHome from '../screens/auth/AuthHome'

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
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})
