import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { LOGIN, SIGN_UP } from '../../../constants/screens'
import GlassyCard from '../../common/GlassyCard'
import {
  themeContainer,
  theme,
  linkText,
  purplePallet,
  skyBlue
} from '../../common/style'
const logo = require('../../../../assets/images/gec_logo.png')

const AuthHome = () => {
  const { navigate } = useNavigation()
  return (
    <GlassyCard
      containerStyle={{ padding: 20 }}
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
    </GlassyCard>
  )
}

export default AuthHome

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 100,
    marginBottom: 20
  }
})
