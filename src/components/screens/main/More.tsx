import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../../redux/hooks'
import { selectAuth } from '../../../redux/slices/authSlice'
import Header from '../../common/Header'
import {
  flexColumn,
  greys,
  purplePallet,
  stretchedBox
} from '../../common/style'

const More = () => {
  const { user } = useAppSelector(selectAuth)
  return (
    <SafeAreaView>
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
        style={stretchedBox}>
        <Header title="More" />
        <ScrollView style={[flexColumn, { padding: 10 }]}>
          <ListItem
            bottomDivider
            onPress={() => {
              console.log('pressed')
            }}>
            <Avatar
              source={
                user.avatar
                  ? {
                      uri: user.avatar
                    }
                  : require('../../../../assets/images/avatar.png')
              }
            />
            <ListItem.Content>
              <ListItem.Title>Item One</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 20,
    paddingTop: 10
  },
  itemText: {
    textAlign: 'center',
    color: greys[30],
    fontSize: 15,
    fontWeight: 'bold'
  }
})
