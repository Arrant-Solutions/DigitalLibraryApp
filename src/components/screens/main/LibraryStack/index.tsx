import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LIBRARY, CATEGORY, MEDIA_PLAYER } from '../../../../constants/screens'
import Library from './Library'
import Category from './Category'
import MediaPlayer from '../MediaPlayer'

const Stack = createStackNavigator()

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name={LIBRARY} component={Library} />
      <Stack.Screen name={CATEGORY} component={Category} />
      <Stack.Screen name={MEDIA_PLAYER} component={MediaPlayer} />
    </Stack.Navigator>
  )
}
