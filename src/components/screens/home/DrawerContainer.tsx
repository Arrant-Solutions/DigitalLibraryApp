import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import React from 'react'
import {Button, useWindowDimensions} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {Avatar} from 'react-native-elements/dist/avatar/Avatar'
import {useAppSelector} from 'redux/hooks'
import {selectAuth} from 'redux/slices/authSlice'

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

const DrawerContentContainer: React.FC<DrawerContentComponentProps> = props => {
  const {
    user: {avatar, fullname},
  } = useAppSelector(selectAuth)
  // const Blur = Platform.OS === 'android' ? BlurView : VibrancyView
  return (
    <DrawerContentScrollView style={{backgroundColor: '#fff5'}} {...props}>
      <View style={styles.drawerHeader}>
        <Avatar
          containerStyle={{alignSelf: 'center'}}
          size="large"
          rounded
          source={{uri: avatar}}
          icon={{name: 'user', type: 'entypo'}}
        />
        <Text style={styles.fullname}>{fullname}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => console.log('Link to help')} />
    </DrawerContentScrollView>
  )
}

const DrawerContainer = () => {
  const dimensions = useWindowDimensions()

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContentContainer {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: 'transparent',
          width: 250,
        },
      }}
      initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({
  drawerHeader: {
    flex: 1,
    flexDirection: 'column',
  },
  fullname: {
    textAlign: 'center',
  },
})
