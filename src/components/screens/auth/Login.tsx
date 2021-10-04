import React, {useEffect, useState} from 'react'
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native'
import {Input} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {UserCredential} from '../../../types/User'
import {useAppDispatch} from '../../../redux/hooks'
import GlassyCard from 'components/screens/common/GlassyCard'
import PCLButton from 'components/screens/common/PCLButton'
import {flexColumn, pcl} from 'components/screens/common/style'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import SocialAuth from '../common/SocialAuth'
import ModalLoader from '../common/ModalLoader'
import {AuthSliceI, login} from 'redux/slices/authSlice'
import {AuthStackParamList} from 'components/MainNavigation'
import {StackNavigationProp} from '@react-navigation/stack'
import LinkText from '../common/LinkText'

type LoginNavProp = StackNavigationProp<AuthStackParamList, 'Login'>

const Login = () => {
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<LoginNavProp>()
  const [credential, setCredential] = useState<UserCredential>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const focused = useIsFocused()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [focused])

  const handleChange = (key: keyof UserCredential, value: string) => {
    setCredential({
      ...credential,
      [key]: value,
    })
  }

  const handleLogin = () => {
    if (credential.email.length && credential.password.length) {
      setLoading(true)
      dispatch(login(credential)).then(response => {
        const {payload} = response as {payload: AuthSliceI}
        if (payload.errorMessage.length) {
          Alert.alert(
            'Login Failed',
            payload.errorMessage,
            [
              /Registration incomplete/i.test(payload.errorMessage)
                ? {text: 'Register', onPress: () => navigate('Register')}
                : {text: 'Close', style: 'cancel'},
            ],
            {cancelable: false},
          )
          setLoading(false)
          setCredential({
            ...credential,
            password: '',
          })
        }
      })
    }
  }

  return (
    <GlassyCard
      title="Login"
      showActionButtons={false}
      showBack
      backgroundColor={pcl.purple}
      barStyle="light-content"
      blurAmount={0}
      solidContainerStyle={{backgroundColor: pcl.background, padding: 20}}
      cardContainerStyle={{padding: 20, paddingVertical: 30}}
      colors={[pcl.background, pcl.background]}
      containerStyle={{height: 400}}>
      <SocialAuth setLoading={setLoading} />
      <Input
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={pcl.textPlaceholder}
        placeholder="Email"
        leftIcon={
          <Ionicons name="mail-outline" size={20} color={pcl.textPlaceholder} />
        }
        onChangeText={value => handleChange('email', value)}
        value={credential.email}
        multiline={false}
      />
      <Input
        value={credential.password}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={pcl.textPlaceholder}
        multiline={false}
        secureTextEntry={!showPassword}
        placeholder="Password"
        leftIcon={<Ionicons name="key" size={20} color={pcl.textPlaceholder} />}
        rightIcon={
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={pcl.textPlaceholder}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={value => handleChange('password', value)}
      />
      <View style={[flexColumn, {width: '100%'}]}>
        <PCLButton
          titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#000b'}}
          loading={loading}
          title="Login"
          onPress={handleLogin}
        />
        <LinkText
          style={{
            marginTop: 10,
            marginLeft: 8,
            fontWeight: '500',
            textAlign: 'left',
            fontSize: 14,
          }}
          text="Forgot your password?"
          onPress={() => navigate('Forgot')}
        />
      </View>
      <ModalLoader transparent={true} visible={loading} />
    </GlassyCard>
  )
}

export default Login

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: pcl.textPlaceholder,
    borderBottomWidth: 1 / 2,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
})
