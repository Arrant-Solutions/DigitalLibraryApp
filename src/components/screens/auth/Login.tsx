import React, { useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Button, Input, SocialIcon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserCredential } from '../../../models/user'
import { useAppDispatch } from '../../../redux/hooks'
import { login } from '../../../redux/slices/authSlice'
import GlassyCard from '../../common/GlassyCard'
import {
  flexColumn,
  flexRow,
  googleBlue,
  purplePallet,
  socialButton
} from '../../common/style'

const Login = () => {
  const dispatch = useAppDispatch()
  const [credential, setCredential] = useState<UserCredential>({
    email: 'email@mail.com',
    password: 'password'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChange = (key: keyof UserCredential, value: string) => {
    setCredential({
      ...credential,
      [key]: value
    })
  }

  const handleLogin = () => {
    setLoading(true)
    dispatch(login(credential))
      .then(res => {
        // console.log(res)
      })
      .finally(() => setLoading(false))
  }

  return (
    <GlassyCard
      containerStyle={{ height: 400 }}
      cardContainerStyle={{ padding: 20, paddingVertical: 30 }}
      colors={[
        purplePallet.purpleDarker,
        purplePallet.purpleDarker,
        purplePallet.purpleLight
      ]}>
      <Text
        style={[
          { paddingHorizontal: 10, fontSize: 15, marginBottom: 10 },
          Platform.OS === 'android' ? { color: '#fff' } : {}
        ]}>
        Sign in with one of the following options.
      </Text>
      <View
        style={[
          flexRow,
          {
            justifyContent: 'space-between',
            marginBottom: 10,
            width: '100%'
          }
        ]}>
        <SocialIcon
          style={socialButton}
          underlayColor={`${googleBlue}60`}
          button
          iconSize={20}
          type="facebook"
          onPress={() => console.log('pressed')}
        />
        <SocialIcon
          style={{
            ...socialButton,
            backgroundColor: googleBlue
          }}
          iconSize={20}
          underlayColor={`${googleBlue}60`}
          button
          type="google"
          onPress={() => console.log('pressed')}
        />
      </View>
      <Input
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor="#ccc"
        placeholder="Email"
        leftIcon={<Ionicons name="mail-outline" size={20} color="white" />}
        onChangeText={value => handleChange('email', value)}
        value={credential.email}
        multiline={false}
      />
      <Input
        value={credential.password}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor="#ccc"
        multiline={false}
        secureTextEntry={!showPassword}
        placeholder="Password"
        leftIcon={<Ionicons name="key" size={20} color="white" />}
        rightIcon={
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="white"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={value => handleChange('password', value)}
      />
      <View style={[flexColumn, { width: '100%' }]}>
        <Button
          style={{ margin: 8 }}
          buttonStyle={{
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: '#17171760'
          }}
          loading={loading}
          titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
          title="Login"
          onPress={handleLogin}
        />
      </View>
    </GlassyCard>
  )
}

export default Login

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: purplePallet.text,
    borderBottomWidth: 1 / 2
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  }
})
