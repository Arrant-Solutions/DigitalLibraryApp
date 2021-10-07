import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Library from './Library'
import Category from './Category'
import MediaPlayer from '../MediaPlayer'
import {Media} from 'types/Media'

export type LibraryParamList = {
  LibraryScreen: undefined
  Category: {
    id: string | number
    name: string
  }
  'Media Player': Media
}

const Stack = createStackNavigator<LibraryParamList>()

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LibraryScreen" component={Library} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Media Player" component={MediaPlayer} />
    </Stack.Navigator>
  )
}
