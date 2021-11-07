import React, {useState} from 'react'
import {Alert, StyleSheet, Text, View} from 'react-native'
import {Accessory, Avatar, Button, Icon} from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks'
import {selectAuth, logout} from '../../../../redux/slices/authSlice'
import {Dimensions} from 'react-native'
import {BlurView} from '@react-native-community/blur'
import {black, greys, pcl} from '../../common/style'
import Header from '../../common/Header'
import ModalLoader from 'components/screens/common/ModalLoader'
import {requestPasswordReset} from 'redux/services/auth'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import {StackNavigationProp} from '@react-navigation/stack'
import {MoreParamList} from '.'
import {useNavigation} from '@react-navigation/native'
import {setAlert} from 'redux/slices/alertSlice'

const {height, width} = Dimensions.get('window')

type MoreNavProp = StackNavigationProp<MoreParamList, 'MoreScreen'>

const More = () => {
  const [loading, setLoading] = useState(false)
  const {user} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<MoreNavProp>()

  const onlyPremium = () => {
    // Alert.alert(
    //   'Not Available',
    //   'Activity Reports are only available to premium customers',
    // )
    dispatch(
      setAlert({
        title: 'Not Available',
        message: 'Activity Reports are only available to premium customers',
      }),
    )
  }

  const comingSoon = () => {
    // Alert.alert(
    //   'Comming Soon!',
    //   'Coming soon with even more exciting and uplifting sermons, teachings and books.',
    // )
    dispatch(
      setAlert({
        title: 'Comming Soon!',
        message:
          'Coming soon with even more exciting and uplifting sermons, teachings and books.',
      }),
    )
  }

  const handleResetRequest = () => {
    setLoading(true)
    requestPasswordReset(user.email)
      .then(({data, statusCode}) => {
        if (statusCode === 200) {
          // Alert.alert(
          //   'Reset Password',
          //   'A password reset email has been sent. Check your email to complete the reset process.',
          //   [{text: 'Cancel'}],
          //   {cancelable: true},
          // )
          dispatch(
            setAlert({
              title: 'Reset Password',
              message:
                'A password reset email has been sent. Check your email to complete the reset process.',
              buttons: [{text: 'Cancel'}],
            }),
          )
        } else {
          // Alert.alert('Reset Failed', data)
          dispatch(
            setAlert({
              title: 'Reset Failed',
              message: data,
            }),
          )
        }
      })
      .catch(() => {
        // Alert.alert('Reset Failed', GENERIC_SERVER_ERROR)
        dispatch(
          setAlert({
            title: 'Reset Failed',
            message: GENERIC_SERVER_ERROR,
          }),
        )
      })
      .finally(() => setLoading(false))
  }

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
          borderTopColor: pcl.gold,
          zIndex: 999,
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
              {user.avatar ? (
                <Avatar
                  containerStyle={{
                    backgroundColor: `${pcl.gold}40`,
                    padding: 1,
                    alignSelf: 'center',
                  }}
                  size={120}
                  rounded
                  title={`${user.first_name.charAt(0)}${user.last_name.charAt(
                    0,
                  )}`}
                  source={{
                    uri: user.avatar,
                  }}>
                  <Avatar.Accessory
                    backgroundColor="pink"
                    height={30}
                    width={30}
                    tvParallaxProperties={undefined}
                    name="ios-pencil-outline"
                    type="ionicon"
                    size={30}
                    color="red"
                  />
                </Avatar>
              ) : (
                <Avatar
                  containerStyle={{
                    backgroundColor: `${pcl.gold}60`,
                    alignSelf: 'center',
                  }}
                  size="xlarge"
                  rounded
                  title={`${user.first_name.charAt(0)}${user.last_name.charAt(
                    0,
                  )}`}
                  activeOpacity={0.7}
                />
              )}
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
                      tvParallaxProperties={undefined}
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
                  onPress={comingSoon}
                  icon={
                    <Icon
                      tvParallaxProperties={undefined}
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
                  onPress={onlyPremium}
                  icon={
                    <Icon
                      tvParallaxProperties={undefined}
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
                  onPress={handleResetRequest}
                  type="clear"
                  style={{alignItems: 'flex-start'}}
                  icon={
                    <Icon
                      tvParallaxProperties={undefined}
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
                  onPress={() => navigate('Feedback')}
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
        <ModalLoader transparent={true} visible={loading} />
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
