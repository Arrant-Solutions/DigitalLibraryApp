import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import React, {useState} from 'react'
import {StyleSheet, Image, View, Text, Platform, Alert} from 'react-native'
import {SocialIcon} from 'react-native-elements'
import {AppleButton} from '@invertase/react-native-apple-authentication'
import Icon from 'react-native-vector-icons/Ionicons'
import GlassyCard from '../common/GlassyCard'
import PCLButton from '../common/PCLButton'
import {linkText, googleBlue, pcl} from '../common/style'
import {appleSignIn} from 'redux/services/auth'
import {useAppDispatch} from 'redux/hooks'
import {setCredential, setUserDetails} from 'redux/slices/authSlice'
import {GenericUser} from 'types/User'
const logo = require('assets/icon.jpg')

type AuthHomeProp = StackNavigationProp<AuthStackParamList, 'AuthHome'>

const AuthHome = () => {
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<AuthHomeProp>()

  const handleAppleLogin = async () => {
    const {data} = await appleSignIn()
    if (typeof data === 'string') {
      Alert.alert('Login Failed', data, [{text: 'Ok', style: 'cancel'}], {
        cancelable: true,
      })
    } else {
      if (data.user instanceof GenericUser) {
        dispatch(setUserDetails(data.user))
      } else {
        dispatch(
          setUserDetails({
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          }),
        )
        dispatch(setCredential(data.credential))
      }
      dispatch(setCredential(data.credential))
    }
  }

  return (
    <GlassyCard
      blurAmount={0}
      containerStyle={{height: 'auto'}}
      solidContainerStyle={{backgroundColor: pcl.background, padding: 20}}
      cardContainerStyle={{padding: 20, paddingVertical: 30}}
      colors={[pcl.background, pcl.background]}>
      <Image style={styles.logo} source={logo} />
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...styles.text, marginRight: 5}}>Sign up or</Text>
        <Text
          style={[styles.text, linkText, {color: pcl.blue, fontWeight: 'bold'}]}
          onPress={() => navigate('Login')}>
          Login
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          marginTop: 20,
        }}>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={[
              {
                borderRadius: 10,
                marginHorizontal: 8,
                marginBottom: 8,
                height: 50,
              },
              styles.shadow,
            ]}
            onPress={handleAppleLogin}
          />
        )}
        <SocialIcon
          style={{borderRadius: 10}}
          title="Sign-In With Facebook"
          underlayColor={`${googleBlue}60`}
          button
          type="facebook"
          onPress={() => console.log('pressed')}
        />
        <SocialIcon
          style={{borderRadius: 10, backgroundColor: googleBlue}}
          underlayColor={`${googleBlue}60`}
          title="Sign-In With Google"
          button
          type="google"
          onPress={() => console.log('pressed')}
        />
        <PCLButton
          icon={
            <Icon
              style={{marginRight: 15}}
              name="mail"
              color="#000a"
              size={28}
            />
          }
          title="Sign Up With Email"
          onPress={() => navigate('Register')}
        />
      </View>
    </GlassyCard>
  )
}

export default AuthHome

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 10,
  },
  text: {
    color: '#000b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
