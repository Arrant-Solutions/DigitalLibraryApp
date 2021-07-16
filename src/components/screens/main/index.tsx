import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import { purplePallet } from '../../common/style'
import Home from './Home'
import Settings from './Settings'
import Search from './Search'
import Categories from './Library'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Favorites from './Favorites'

const Tab = createBottomTabNavigator()

const index = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          purplePallet.purpleDarker,
          purplePallet.purpleDarker,
          purplePallet.purpleLight
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={110}
        style={[styles.card]}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: purplePallet.text,
            tabStyle: {
              backgroundColor: purplePallet.purpleDeep
            },
            labelStyle: {
              fontSize: 14
            }
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              )
            }}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="grid-outline" color={color} size={size} />
              )
            }}
            name="Library"
            component={Categories}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'heart' : 'heart-outline'}
                  color={focused ? 'red' : color}
                  size={size}
                />
              )
            }}
            name="Favourites"
            component={Favorites}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )
            }}
            name="Settings"
            component={Settings}
          />
        </Tab.Navigator>
      </LinearGradient>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  card: {
    height: '100%',
    width: '100%'
  }
})
