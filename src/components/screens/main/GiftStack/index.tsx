import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Voucher from './Voucher'
import Offer from './Offer'
import GiftsHome from './GiftsHome'

export type GiftParamList = {
  Voucher: undefined
  Offer: undefined
  GiftsHome: undefined
}

const Stack = createStackNavigator<GiftParamList>()

export default function index() {
  return (
    <Stack.Navigator
      initialRouteName="GiftsHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="GiftsHome" component={GiftsHome} />
      <Stack.Screen name="Voucher" component={Voucher} />
      <Stack.Screen name="Offer" component={Offer} />
    </Stack.Navigator>
  )
}
