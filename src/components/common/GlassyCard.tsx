import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StyleProp,
  ViewStyle
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { themeContainer, theme } from '../common/style'

interface GlassyCardProps {
  colors?: string[]
  angle?: number
  gradientStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  cardContainerStyle?: StyleProp<ViewStyle>
}

const GlassyCard: React.FC<GlassyCardProps> = ({
  colors,
  angle,
  gradientStyle,
  children,
  containerStyle,
  cardContainerStyle
}) => {
  return (
    <SafeAreaView style={{ display: 'flex', flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <LinearGradient
          colors={
            colors || [theme.inputBackgroundColor, '#2b1b3b', theme.black]
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={angle || 110}
          style={gradientStyle || styles.fixed}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flex: 1,
            display: 'flex',
            backgroundColor: 'transparent'
          }}
          style={styles.scrollViewStyle}>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
            <BlurView
              blurType="light"
              blurAmount={20}
              style={[styles.cardContainer, containerStyle]}>
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                useAngle
                angle={110}
                style={[styles.card, cardContainerStyle]}>
                {children}
              </LinearGradient>
            </BlurView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default GlassyCard

const styles = StyleSheet.create({
  fixed: {
    ...themeContainer
  },
  backgroundAbstractImage: {
    position: 'absolute',
    height: undefined,
    width: '30%',
    aspectRatio: 1,
    zIndex: 5,
    transform: [{ translateY: 200 }, { rotateZ: '-55deg' }, { scale: 1.5 }]
  },
  scrollViewStyle: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  container: {
    display: 'flex'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  cardContainer: {
    width: '90%',
    height: 500,
    borderRadius: 20
  },
  card: {
    height: '100%',
    width: '100%',
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 100
  }
})
