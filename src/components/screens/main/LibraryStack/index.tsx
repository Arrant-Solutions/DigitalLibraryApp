import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LIBRARY, CATEGORY } from '../../../../constants/screens'
import Library from './Library'
import Category from './Category'

const Stack = createStackNavigator()

export default function index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name={LIBRARY} component={Library} />
      <Stack.Screen name={CATEGORY} component={Category} />
    </Stack.Navigator>
  )
}
