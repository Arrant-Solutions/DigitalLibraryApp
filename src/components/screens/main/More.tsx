import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '../../../redux/hooks'
import { selectAuth } from '../../../redux/slices/authSlice'
import Header from '../../common/Header'
import {
  copper,
  gold,
  greys,
  purple,
  purplePallet,
  stretchedBox
} from '../../common/style'
import { Dimensions } from 'react-native'
import { TouchableHighlight } from 'react-native'

const { height, width } = Dimensions.get('window')

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
        <Header title="More" containerStyle={{ borderBottomWidth: 0 }} />
        <View
          style={{
            height: 30,
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
            zIndex: 999,
            backgroundColor: 'white',
            padding: 5,
            alignSelf: 'center',
            top: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
          size={130}
          rounded
          source={
            user.avatar
              ? {
                  uri: user.avatar
                }
              : require('../../../../assets/images/girly.jpg')
          }
        />
        <View style={styles.shadowed}>
          <View
            style={{
              marginTop: 45,
              flex: 1
            }}>
            <Text
              style={{ fontSize: 30, textAlign: 'center', color: gold[40] }}>
              {user.fullname}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 8,
                textAlign: 'center',
                color: copper[40]
              }}>
              {user.email}
            </Text>
            <View
              style={{
                width,
                height,
                alignSelf: 'center'
              }}>
              <View style={styles.box}>
                <Button
                  type="clear"
                  style={{ alignItems: 'flex-start' }}
                  icon={
                    <Icon
                      type="material-community"
                      name="account-edit-outline"
                      size={25}
                      color="blue"
                    />
                  }
                  title="Edit Profile"
                />
                <Button
                  type="clear"
                  style={{ alignItems: 'flex-start' }}
                  icon={<Icon name="credit-card" size={20} color="blue" />}
                  title="Payment Details"
                />
                <Button
                  type="clear"
                  style={{ alignItems: 'flex-start' }}
                  icon={
                    <Icon
                      type="fontisto"
                      name="bar-chart"
                      size={15}
                      color="blue"
                    />
                  }
                  title="Activity Reports"
                />
                <Button
                  type="clear"
                  style={{ alignItems: 'flex-start' }}
                  icon={
                    <Icon
                      type="ionicon"
                      name="key-sharp"
                      size={20}
                      color="blue"
                    />
                  }
                  title="Reset Password"
                />
              </View>

              <View style={styles.box}>
                <Text>We would like to hear from you</Text>
                <Text>Give us your feedback</Text>
              </View>
              <View style={styles.box}>
                <Text>Terms and Conditions</Text>
              </View>
              <View style={styles.box}>
                <Text>Logout</Text>
              </View>

              <Text
                style={{
                  alignSelf: 'flex-end'
                }}>
                App version 1.001 (Paul of Tarsus)
              </Text>
            </View>
          </View>
        </View>
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
  },
  shadowed: {
    flex: 1,
    backgroundColor: `${purple[60]}60`,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    marginTop: 10,
    position: 'absolute',
    width: width * 1.5,
    height: height,
    top: 130,
    alignSelf: 'center'
  },
  box: {
    backgroundColor: '#fff',
    marginTop: 10
  }
})
