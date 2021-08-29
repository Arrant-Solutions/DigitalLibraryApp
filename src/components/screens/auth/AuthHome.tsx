import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import {Screens} from 'constants/screens'
import React from 'react'
import {StyleSheet, Image, View, Text, StatusBar} from 'react-native'
import {SocialIcon, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import GlassyCard from '../common/GlassyCard'
import {purplePallet, linkText, skyBlue, googleBlue, pcl} from '../common/style'
const logo = require('../../../../assets/icon.jpg')

type AuthHomeProp = StackNavigationProp<AuthStackParamList, 'AuthHome'>

const AuthHome = () => {
  console.log('========>', 'AuthHome')
  const {navigate} = useNavigation<AuthHomeProp>()

  return (
    <GlassyCard
      cardContainerStyle={{padding: 20, paddingVertical: 30}}
      colors={[pcl.background, pcl.background]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={purplePallet.purpleDeep}
      />
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
        <SocialIcon
          style={{borderRadius: 10}}
          title="Sign Up With Facebook"
          underlayColor={`${googleBlue}60`}
          button
          type="facebook"
          onPress={() => console.log('pressed')}
        />
        <SocialIcon
          style={{borderRadius: 10, backgroundColor: googleBlue}}
          underlayColor={`${googleBlue}60`}
          title="Sign Up With Google"
          button
          type="google"
          onPress={() => console.log('pressed')}
        />
        <Button
          containerStyle={{margin: 8, borderRadius: 10}}
          buttonStyle={{
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: '#17171722',
          }}
          titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#000b'}}
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
    color: purplePallet.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
