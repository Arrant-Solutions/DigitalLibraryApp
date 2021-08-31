import {createStackNavigator} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import React from 'react'
import {StyleSheet} from 'react-native'
import {pcl} from '../common/style'
import AuthHome from './AuthHome'
import Login from './Login'
import Signup from './Signup'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AuthHome'}
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: pcl.background,
        },
        headerTintColor: pcl.blue,
        // headerLeft: () => <></>
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'AuthHome'}
        component={AuthHome}
      />
      <Stack.Screen name={'Register'} component={Signup} />
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})
