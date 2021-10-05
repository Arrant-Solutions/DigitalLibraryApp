import {useIsFocused, useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import React, {useEffect, useState} from 'react'
import {StyleSheet, Image, View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import GlassyCard from '../common/GlassyCard'
import PCLButton from '../common/PCLButton'
import {linkText, pcl} from '../common/style'
import {useAppDispatch} from 'redux/hooks'
import ModalLoader from '../common/ModalLoader'
import SocialAuth from '../common/SocialAuth'
const logo = require('assets/icon.jpg')

type AuthHomeProp = StackNavigationProp<AuthStackParamList, 'AuthHome'>

const AuthHome = () => {
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<AuthHomeProp>()
  const focused = useIsFocused()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [focused])

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
        <SocialAuth setLoading={setLoading} largeButton={true} signup={true} />
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
      <ModalLoader transparent={true} visible={loading} />
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
