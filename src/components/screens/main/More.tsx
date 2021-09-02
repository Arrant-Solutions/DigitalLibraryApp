import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Avatar, Button, Icon} from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useAppSelector} from '../../../redux/hooks'
import {selectAuth} from '../../../redux/slices/authSlice'
import {Dimensions} from 'react-native'
import {BlurView} from '@react-native-community/blur'
import {
  black,
  copper,
  gold,
  greys,
  purple,
  purplePallet,
  stretchedBox,
} from '../common/style'
import Header from '../common/Header'

const {height, width} = Dimensions.get('window')

const More = () => {
  const {user} = useAppSelector(selectAuth)
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[
          purplePallet.purpleDarker,
          purplePallet.purpleDarker,
          purplePallet.purpleLight,
        ]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle
        angle={110}
        style={stretchedBox}>
        <Header title="More" containerStyle={{borderBottomWidth: 0}} />
        <View
          style={{
            height: 30,
            backgroundColor: purple[60],
          }}></View>
        <View
          style={{
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: Dimensions.get('window').width,
            borderTopWidth: 70,
            borderRightColor: 'transparent',
            borderTopColor: purple[60],
          }}></View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.shadowed}>
            <View
              style={{
                marginTop: 45,
                flex: 1,
              }}>
              <Text
                style={{fontSize: 30, textAlign: 'center', color: gold[40]}}>
                {user.fullname}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 8,
                  textAlign: 'center',
                  color: copper[40],
                }}>
                {user.email}
              </Text>
              <View
                style={{
                  width,
                  height,
                  alignSelf: 'center',
                  paddingHorizontal: '1.5%',
                }}>
                <View style={styles.box}>
                  <Button
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    icon={
                      <Icon
                        type="material-community"
                        name="account-edit-outline"
                        size={25}
                        color={black[60]}
                        containerStyle={{marginRight: 10}}
                      />
                    }
                    title="Edit Profile"
                  />
                  <Button
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    icon={
                      <Icon
                        name="credit-card"
                        size={20}
                        color={black[60]}
                        containerStyle={{marginRight: 10}}
                      />
                    }
                    title="Payment Details"
                  />
                  <Button
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    icon={
                      <Icon
                        type="fontisto"
                        name="bar-chart"
                        size={15}
                        color={black[60]}
                        containerStyle={{marginRight: 10}}
                      />
                    }
                    title="Activity Reports"
                  />
                  <Button
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    icon={
                      <Icon
                        type="ionicon"
                        name="key-sharp"
                        size={20}
                        color={black[60]}
                        containerStyle={{marginRight: 10}}
                      />
                    }
                    title="Reset Password"
                  />
                </View>

                <View style={styles.box}>
                  <Text
                    style={{
                      color: black[70],
                      fontSize: 16,
                      paddingLeft: 7,
                      paddingTop: 7,
                    }}>
                    We would like to hear from you
                  </Text>
                  <Button
                    containerStyle={{
                      margin: 0,
                    }}
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    title="Give us your feedback"
                  />
                </View>
                <View style={styles.box}>
                  <Button
                    containerStyle={{
                      margin: 0,
                    }}
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    title="Terms and Conditions"
                  />
                </View>
                <View style={styles.box}>
                  <Button
                    containerStyle={{
                      margin: 0,
                    }}
                    type="clear"
                    style={{alignItems: 'flex-start'}}
                    title="Logout"
                  />
                </View>

                <Text
                  style={{
                    alignSelf: 'flex-end',
                    color: black[80],
                    // padding: 10
                  }}>
                  Version 1.001 (Paul of Tarsus)
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BlurView blurType="light" blurAmount={30} style={styles.blurView}>
              <Avatar
                containerStyle={{
                  backgroundColor: purple[40],
                  padding: 1,
                  alignSelf: 'center',
                  position: 'absolute',
                }}
                size={120}
                rounded
                source={
                  user.avatar
                    ? {
                        uri: user.avatar,
                      }
                    : require('assets/girly.jpg')
                }
              />
            </BlurView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
  scrollView: {
    position: 'absolute',
    top: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 50,
  },
  blurView: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: greys[30],
    fontSize: 15,
    fontWeight: 'bold',
  },
  profile: {
    flexDirection: 'row',
  },
  profileText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
  },
  box: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
  },
})
