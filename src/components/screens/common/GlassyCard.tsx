import {BlurView} from '@react-native-community/blur'
import React from 'react'
import {KeyboardAvoidingView, StatusBar, StatusBarStyle} from 'react-native'
import {
  SafeAreaView,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {themeContainer, theme, shadow, statusBar} from '../common/style'
import PCLStatusBar, {PCLStatusBarProps} from './PCLStatusBar'

interface GlassyCardProps extends PCLStatusBarProps {
  blurAmount?: number
  colors?: string[]
  angle?: number
  gradientStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  cardContainerStyle?: StyleProp<ViewStyle>
  solidContainerStyle?: StyleProp<ViewStyle>
}

const GlassyCard: React.FC<GlassyCardProps> = ({
  blurAmount = 20,
  colors,
  angle,
  gradientStyle,
  children,
  containerStyle,
  cardContainerStyle,
  solidContainerStyle,
  barStyle,
  backgroundColor,
}) => {
  return (
    <SafeAreaProvider>
      {(barStyle || backgroundColor) && (
        <PCLStatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      )}
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'red'}}>
        <LinearGradient
          colors={
            colors || [theme.inputBackgroundColor, '#2b1b3b', theme.black]
          }
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          useAngle
          angle={angle || 110}
          style={gradientStyle || styles.fixed}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flex: 1,
            display: 'flex',
            backgroundColor: 'transparent',
          }}
          style={styles.scrollViewStyle}>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            {blurAmount ? (
              <BlurView
                blurType="light"
                blurAmount={blurAmount}
                style={[styles.cardContainer, containerStyle]}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  useAngle
                  angle={110}
                  style={[styles.card, cardContainerStyle]}>
                  {children}
                </LinearGradient>
              </BlurView>
            ) : (
              <View
                style={[
                  styles.cardContainer,
                  shadow,
                  containerStyle,
                  solidContainerStyle,
                ]}>
                {children}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default GlassyCard

const styles = StyleSheet.create({
  fixed: {
    ...themeContainer,
  },
  backgroundAbstractImage: {
    position: 'absolute',
    height: undefined,
    width: '30%',
    aspectRatio: 1,
    zIndex: 5,
    transform: [{translateY: 200}, {rotateZ: '-55deg'}, {scale: 1.5}],
  },
  scrollViewStyle: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  container: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  cardContainer: {
    width: '90%',
    height: 520,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 100,
  },
})
