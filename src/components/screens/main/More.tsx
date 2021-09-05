import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Avatar, Button, Icon} from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {selectAuth, logout} from '../../../redux/slices/authSlice'
import {Dimensions} from 'react-native'
import {BlurView} from '@react-native-community/blur'
import {black, copper, gold, greys, pcl, stretchedBox} from '../common/style'
import Header from '../common/Header'

const {height, width} = Dimensions.get('window')

const More = () => {
  const {user} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const handleLogout = () => dispatch(logout())
  return (
    <View style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}>
      <Header title="More" containerStyle={{borderBottomWidth: 0}} />
      <View
        style={{
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderRightWidth: Dimensions.get('window').width,
          borderTopWidth: 70,
          borderRightColor: 'transparent',
          borderTopColor: pcl.purple,
        }}></View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.shadowed}>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BlurView
              blurType="light"
              blurAmount={30}
              style={[
                styles.blurView,
                {
                  position: 'absolute',
                  top: -100,
                  zIndex: 9999,
                },
              ]}>
              <Avatar
                containerStyle={{
                  backgroundColor: `${pcl.gold}40`,
                  padding: 1,
                  alignSelf: 'center',
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
          <View
            style={{
              marginTop: 45,
              flex: 1,
            }}>
            <Text
              style={{fontSize: 30, textAlign: 'center', color: pcl.purple}}>
              {user.fullname}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 8,
                textAlign: 'center',
                color: pcl.purple,
              }}>
              {user.email}
            </Text>
            <View
              style={{
                width,
                height,
                alignSelf: 'center',
                paddingHorizontal: '2%',
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
                  onPress={handleLogout}
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
      </ScrollView>
    </View>
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
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
    height: undefined,
    width: '100%',
    paddingBottom: 50,
    // backgroundColor: 'red',
  },
  blurView: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    top: 0,
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
    backgroundColor: pcl.background,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    marginTop: 10,
    // position: 'absolute',
    width: width * 1.5,
    height: height,
    top: 90,
    alignSelf: 'center',
  },
  box: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1 / 5,
    borderColor: `${pcl.purple}99`,
  },
})
