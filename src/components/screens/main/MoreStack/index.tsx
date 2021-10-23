import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import More from './More'
import Category from '../Category'
import Feedback from './Feedback'
import PaymentDetails from './PaymentDetails'
import TermsAndConditions from './TermsAndConditions'

export type MoreParamList = {
  MoreScreen: undefined
  'Activity Reports': undefined
  Feedback: undefined
  'Payment Details': undefined
  'Terms & Conditions': undefined
}

const Stack = createStackNavigator<MoreParamList>()

export default function index() {
  return (
    <Stack.Navigator
      initialRouteName="MoreScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MoreScreen" component={More} />
      <Stack.Screen name="Activity Reports" component={Category} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Payment Details" component={PaymentDetails} />
      <Stack.Screen name="Terms & Conditions" component={TermsAndConditions} />
    </Stack.Navigator>
  )
}
