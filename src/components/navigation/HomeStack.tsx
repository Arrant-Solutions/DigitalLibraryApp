import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import home from '../screens/home'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerLeft: () => <></>
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HOME"
        component={home}
      />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})
