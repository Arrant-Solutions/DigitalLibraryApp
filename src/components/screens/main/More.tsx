import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity
} from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { logout, selectAuth } from '../../../redux/slices/authSlice'
import Header from '../../common/Header'
import {
  black,
  copper,
  gold,
  greys,
  purple,
  purplePallet,
  blue
} from '../../common/style'
import { Dimensions } from 'react-native'
import { BlurView } from '@react-native-community/blur'

const { height, width } = Dimensions.get('window')

const More = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)
  return (
    <View style={{ flex: 1 }}>
      <Header title="More" containerStyle={{ borderBottomWidth: 0 }} />
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
        style={{ display: 'flex', flex: 1 }}>
        <View
          style={{
            height: 30,
            backgroundColor: purple[60]
          }}></View>
        <View
          style={{
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: Dimensions.get('window').width,
            borderTopWidth: 70,
            borderRightColor: 'transparent',
            borderTopColor: purple[60]
          }}></View>
        <ScrollView
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: '#00000000',
            position: 'absolute',
            height: '100%'
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: purple[60],
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              zIndex: 999,
              top: 45,
              padding: 2,
              borderRadius: 70
            }}>
            <Avatar
              containerStyle={{
                backgroundColor: purple[40],
                padding: 1
              }}
              size={120}
              rounded
              source={
                user.avatar
                  ? {
                      uri: user.avatar
                    }
                  : require('../../../../assets/images/girly.jpg')
              }
            />
          </View>
          <View style={styles.shadowed}>
            <View
              style={{
                marginTop: 45,
                flex: 1
              }}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: 'center',
                  color: gold[40]
                }}>
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
                  alignSelf: 'center',
                  paddingHorizontal: '1.5%'
                }}>
                <View style={styles.box}>
                  <TouchableOpacity onPress={() => console.log('pressed')}>
                    <View style={styles.btnBox}>
                      <Icon
                        type="material-community"
                        name="account-edit-outline"
                        size={25}
                        color={black[60]}
                      />
                      <Text style={[styles.linkText, { paddingLeft: 7 }]}>
                        Edit Profile
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => console.log('pressed')}>
                    <View style={styles.btnBox}>
                      <Icon name="credit-card" size={20} color={black[60]} />
                      <Text style={[styles.linkText, { paddingLeft: 11 }]}>
                        Payment Details
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => console.log('pressed')}>
                    <View style={styles.btnBox}>
                      <Icon
                        type="fontisto"
                        name="bar-chart"
                        size={15}
                        color={black[60]}
                      />
                      <Text style={[styles.linkText, { paddingLeft: 11 }]}>
                        Activity Reports
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('pressed')}>
                    <View style={styles.btnBox}>
                      <Icon
                        type="ionicon"
                        name="key-sharp"
                        size={20}
                        color={black[60]}
                      />
                      <Text style={[styles.linkText, { paddingLeft: 11 }]}>
                        Reset Password
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.box}>
                  <Text
                    style={{
                      color: black[70],
                      fontSize: 16,
                      paddingLeft: 15,
                      paddingTop: 7
                    }}>
                    We would like to hear from you
                  </Text>
                  <Text
                    style={[
                      styles.linkText,
                      { paddingBottom: 5, marginTop: 8 }
                    ]}>
                    Give us your feedback
                  </Text>
                </View>

                <Pressable onPress={() => console.log('pressed')}>
                  <View style={styles.box}>
                    <Text style={styles.linkText}>Terms and Conditions</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => dispatch(logout())}>
                  <View style={styles.box}>
                    <Text style={styles.linkText}>Logout</Text>
                  </View>
                </Pressable>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    color: greys[20],
                    marginTop: 20
                    // padding: 10
                  }}>
                  Version 1.001 (Paul of Tarsus)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
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
  scrollView: {
    position: 'absolute',
    top: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 50
  },
  blurView: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
    // position: Platform.OS === 'android' ? 'relative' : 'absolute',
    width: width * 1.5,
    height: height,
    top: 130,
    alignSelf: 'center'
  },
  box: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginVertical: 10,
    borderRadius: 8,
    padding: 8
  },
  btnBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  linkText: {
    color: blue[90],
    fontSize: 18,
    paddingHorizontal: 15,
    paddingBottom: 2
  }
})
