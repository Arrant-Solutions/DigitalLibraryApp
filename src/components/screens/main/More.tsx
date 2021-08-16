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
  purple,
  purplePallet,
  stretchedBox
} from '../../common/style'
import { Dimensions } from 'react-native'

const More = () => {
  const { user } = useAppSelector(selectAuth)
  console.log(user)
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
        <Header title="More" containerStyle={{ borderBottomWidth: 0 }} />
        <View
          style={{
            height: 90,
            backgroundColor: purple[60]
          }}></View>
        <View
          style={{
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: Dimensions.get('window').width,
            borderTopWidth: 70,
            borderRightColor: 'transparent',
            borderTopColor: purple[60]
          }}></View>
        <Avatar
          containerStyle={{
            position: 'absolute',
            backgroundColor: 'white',
            padding: 5,
            alignSelf: 'center',
            top: 100,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
          size={150}
          rounded
          source={
            user.avatar
              ? {
                  uri: user.avatar
                }
              : require('../../../../assets/images/girly.jpg')
          }
        />
        <View style={{ marginTop: 40, backgroundColor: 'red' }}>
          <Text style={{ fontSize: 30 }}>{user.email}</Text>
        </View>
        {/* <ScrollView style={[flexColumn, { paddingVertical: 0 }]}>
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
        </ScrollView> */}
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
  },
  profile: {
    flexDirection: 'row'
  },
  profileText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
