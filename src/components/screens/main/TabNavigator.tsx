import React from 'react'
import {StyleSheet, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LibraryStack from './LibraryStack/'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderOptionsMenu from '../common/HeaderOptionsMenu'
import HomeStack from './HomeStack'
import GiftStack from './GiftStack'
import {useAppSelector} from 'redux/hooks'
import {selectTheme} from 'redux/slices/themeSlice'
import MoreStack from './MoreStack'

export type TabNavigatorParamList = {
  Home: undefined
  Library: undefined
  Gifts: undefined
  More: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const TabNavigator = () => {
  const {background, text, active, inactive} = useAppSelector(selectTheme)
  // const getTabBarVisibility = ({
  //   name,
  // }: RouteProp<Record<string, object | undefined>, 'Home'>) => {
  //   return name !== 'Home'
  // }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: active,
          tabBarInactiveTintColor: inactive,
          tabBarStyle: {
            backgroundColor: background,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}>
        <Tab.Screen
          options={({route}) => ({
            // tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={size}
              />
            ),
          })}
          name="Home"
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                color={color}
                size={size}
              />
            ),
          }}
          name="Library"
          component={LibraryStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons
                name={focused ? 'gift' : 'ios-gift-outline'}
                color={color}
                size={size}
              />
            ),
          }}
          name="Gifts"
          component={GiftStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons
                name={
                  focused
                    ? 'ios-ellipsis-vertical-sharp'
                    : 'ellipsis-vertical-outline'
                }
                color={color}
                size={size}
              />
            ),
          }}
          name="More"
          component={MoreStack}
        />
      </Tab.Navigator>
      {/* </LinearGradient> */}
      <HeaderOptionsMenu />
    </View>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  card: {
    height: '100%',
    width: '100%',
  },
})
