import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../../redux/hooks'
import { selectAuth } from '../../../redux/slices/authSlice'
import Header from '../../common/Header'
import {
  copper,
  flexColumn,
  gold,
  greys,
  purplePallet,
  stretchedBox
} from '../../common/style'
import { BlurView } from '@react-native-community/blur'

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
        <ScrollView style={[flexColumn, { paddingVertical: 0 }]}>
          <ListItem
            containerStyle={{ borderRadius: 0, marginBottom: 10 }}
            Component={TouchableScale}
            // friction={90} //
            // tension={100} //
            // activeScale={0.95} //
            linearGradientProps={{
              colors: [gold[60], gold[20], copper[70]],
              start: { x: 0, y: 0.7 },
              end: { x: 1, y: 0.5 }
            }}
            ViewComponent={LinearGradient}
            onPress={() => {
              console.log('pressed')
            }}>
            <Avatar
              rounded
              source={
                user.avatar
                  ? {
                      uri: user.avatar
                    }
                  : require('../../../../assets/images/avatar.png')
              }
            />
            <ListItem.Content>
              <ListItem.Title>My Profile</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={purplePallet.purpleDeeper} />
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
