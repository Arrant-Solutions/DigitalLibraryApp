import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {Button} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'

function Feed() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => console.log('here2')}
        title="Go to notifications"
      />
    </View>
  )
}

function Article() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => console.log('here')} title="Go back home" />
    </View>
  )
}

const Drawer = createDrawerNavigator()

const DrawerContainer = () => {
  return (
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({})
