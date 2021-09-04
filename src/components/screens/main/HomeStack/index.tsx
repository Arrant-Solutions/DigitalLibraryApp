import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import MediaPlayer from '../MediaPlayer'
import {Media} from 'models/media'
import Home from './Home'

export type HomeParamList = {
  HomeScreen: undefined
  'Media Player': Media
}

const Stack = createStackNavigator<HomeParamList>()

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Media Player" component={MediaPlayer} />
    </Stack.Navigator>
  )
}
