import { BlurView } from '@react-native-community/blur'
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StyleProp,
  ViewStyle
} from 'react-native'
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
      <LinearGradient
        colors={colors || [theme.inputBackgroundColor, '#2b1b3b', theme.black]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={angle || 110}
        style={gradientStyle || styles.fixed}
      />
      <View style={styles.container}>
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
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    width: 350,
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
