import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import { purplePallet } from '../../common/style'
import LibraryStack from './LibraryStack/'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Favorites from './Favorites'
import HeaderOptionsMenu from '../../common/HeaderOptionsMenu'
import More from './More'
import { RouteProp } from '@react-navigation/native'
import HomeStack from '../../navigation/HomeStack'
import Home from './Home'
import MediaPlayer from './MediaPlayer'

const Tab = createBottomTabNavigator()

const Index = () => {
  const getTabBarVisibility = ({
    name
  }: RouteProp<Record<string, object | undefined>, 'Home'>) => {
    return name !== 'Home'
  }

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
            options={({ route }) => ({
              // tabBarVisible: getTabBarVisibility(route),
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  color={color}
                  size={size}
                />
              )
            })}
            name="Home"
            component={MediaPlayer}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'grid' : 'grid-outline'}
                  color={color}
                  size={size}
                />
              )
            }}
            name="Library"
            component={LibraryStack}
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
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={
                    focused
                      ? 'ios-ellipsis-vertical-sharp'
                      : 'ellipsis-vertical-outline'
                  }
                  color={color}
                  size={size}
                />
              )
            }}
            name="More"
            component={More}
          />
        </Tab.Navigator>
      </LinearGradient>
      <HeaderOptionsMenu />
    </View>
  )
}

export default Index

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
