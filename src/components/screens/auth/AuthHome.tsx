import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { SocialIcon, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { LOGIN, SIGN_UP } from '../../../constants/screens'
import GlassyCard from '../../common/GlassyCard'
import { linkText, purplePallet, skyBlue, googleBlue } from '../../common/style'
const logo = require('../../../../assets/images/gec_logo.png')

const AuthHome = () => {
  const { navigate } = useNavigation()

  return (
    <GlassyCard
      cardContainerStyle={{ padding: 20, paddingVertical: 30 }}
      colors={[
        purplePallet.purpleDeep,
        purplePallet.purpleDarker,
        purplePallet.purpleLight
      ]}>
      <Image style={styles.logo} source={logo} />
      <Text
        style={{
          alignSelf: 'flex-start',
          color: purplePallet.textLight,
          fontSize: 20,
          fontWeight: 'bold'
        }}>
        Sign up or{' '}
        <Text
          style={[linkText, { color: skyBlue[90], fontWeight: 'bold' }]}
          onPress={() => navigate(LOGIN)}>
          Login
        </Text>
      </Text>
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          marginTop: 20
        }}>
        <SocialIcon
          style={{ borderRadius: 10 }}
          title="Sign Up With Facebook"
          underlayColor={`${googleBlue}60`}
          button
          type="facebook"
          onPress={() => console.log('pressed')}
        />
        <SocialIcon
          style={{ borderRadius: 10, backgroundColor: googleBlue }}
          underlayColor={`${googleBlue}60`}
          title="Sign Up With Google"
          button
          type="google"
          onPress={() => console.log('pressed')}
        />
        <Button
          buttonStyle={{
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: '#17171760',
            margin: 8
          }}
          titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
          icon={
            <Icon
              style={{ marginRight: 15 }}
              name="mail"
              color="#fff"
              size={28}
            />
          }
          title="Sign Up With Email"
          onPress={() => navigate(SIGN_UP)}
        />
      </View>
    </GlassyCard>
  )
}

export default AuthHome

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 110,
    marginBottom: 30
  }
})
