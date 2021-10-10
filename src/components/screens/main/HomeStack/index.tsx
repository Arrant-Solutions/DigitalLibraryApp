import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './Home'

export type HomeParamList = {
  HomeScreen: undefined
}

const Stack = createStackNavigator<HomeParamList>()

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  )
}
