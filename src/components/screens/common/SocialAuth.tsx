import { AppleButton } from '@invertase/react-native-apple-authentication'
import {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import React from 'react'
import {Alert, Platform, StyleSheet, Text, View} from 'react-native'
import {Button, SocialIcon} from 'react-native-elements'
import {useAppDispatch} from 'redux/hooks'
import {appleSignIn, facebookAuth, googleAuth} from 'redux/services/auth'
import {updateAuth, setUserDetails, setCredential} from 'redux/slices/authSlice'
import { IFbCredential } from 'types'
import {GenericUserI} from 'types/User'
import {pcl, flexRow, socialButton, googleBlue, shadow} from './style'

type StackNavProp = StackNavigationProp<any, ''>

interface SocialAuthProps {
  signup?: boolean
  largeButton?: boolean
  setLoading: (loading: boolean) => void
}

function SocialAuth({signup, largeButton, setLoading}: SocialAuthProps) {
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<StackNavProp>()

  const processLoginRequest = (
    data:
      | {
          credential: IFbCredential
          user:
            | Pick<
                GenericUserI,
                'email' | 'first_name' | 'last_name' | 'avatar'
              >
            | GenericUserI
          token?: string
        }
      | string,
  ) => {
    if (typeof data === 'string') {
      Alert.alert('Login Failed', data, [{text: 'Ok', style: 'cancel'}], {
        cancelable: true,
      })
      setLoading(false)
    } else {
      // succcessful login
      if (data.token && typeof data.user !== 'object') {
        dispatch(
          updateAuth({
            token: data.token,
            user: data.user,
            synced: true,
            credential: data.credential,
          }),
        )
      } else {
        dispatch(
          setUserDetails({
            email: data.user.email,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            avatar: data.user.avatar,
          }),
        )
        dispatch(setCredential(data.credential))
        navigate('Register')
      }
    }
  }

  const handleAppleLogin = async () => {
    setLoading(true)
    const {data} = await appleSignIn()
    processLoginRequest(data)
  }

  const handleFacebookLogin = async () => {
    setLoading(true)
    const {data} = await facebookAuth()
    processLoginRequest(data)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    const {data} = await googleAuth()
    processLoginRequest(data)
  }

  if (largeButton) {
    return (
      <View>
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
              shadow,
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
          onPress={() => handleFacebookLogin()}
        />
        <SocialIcon
          style={{borderRadius: 10, backgroundColor: googleBlue}}
          underlayColor={`${googleBlue}60`}
          title="Sign-In With Google"
          button
          type="google"
          onPress={() => handleGoogleLogin()}
        />
      </View>
    )
  }

  return (
    <View>
      <Text
        style={[
          {paddingHorizontal: 10, fontSize: 15, marginBottom: 10},
          Platform.OS === 'android' ? {color: pcl.black} : {},
        ]}>
        {`${signup ? 'Register' : 'Login'} with one of the following options.`}
      </Text>
      <View
        style={[
          flexRow,
          {
            justifyContent: 'space-between',
            marginBottom: 40,
            width: '100%',
          },
        ]}>
        {Platform.OS === 'ios' && (
          <Button
            containerStyle={[socialButton, {marginRight: 10}]}
            buttonStyle={[
              {
                backgroundColor: '#fff',
                paddingVertical: 10,
              },
            ]}
            raised
            iconContainerStyle={{minWidth: 25}}
            icon={{
              name: 'logo-apple',
              type: 'ionicon',
              size: 25,
            }}
            onPress={handleAppleLogin}
          />
        )}
        <SocialIcon
          style={socialButton}
          underlayColor={`${googleBlue}60`}
          button
          iconSize={20}
          type="facebook"
          onPress={handleFacebookLogin}
        />
        <SocialIcon
          style={{
            ...socialButton,
            backgroundColor: googleBlue,
          }}
          iconSize={20}
          underlayColor={`${googleBlue}60`}
          button
          type="google"
          onPress={handleGoogleLogin}
        />
      </View>
    </View>
  )
}

export default SocialAuth
