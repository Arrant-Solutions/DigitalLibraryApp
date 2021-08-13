import React from 'react'
import { GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native'
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Material from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import { purple, purplePallet, shadow } from './style'

type IconType =
  | 'antdesign'
  | 'entypo'
  // | 'evilicons'
  | 'material'
  | 'feather'
  | 'font-awesome'
  | 'fontisto'
  | 'foundation'
  | 'ionicon'
  | 'material-community'
  | 'octicons'
  | 'simple-line-icons'
  | 'zocial'

interface IconButtonProps {
  onPress?: (event?: GestureResponderEvent) => void
  style?: ViewStyle
  containerStyle?: ViewStyle
  iconStyle?: ViewStyle
  raised?: boolean
  color?: string
  name: string
  type: IconType
  size?: number
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  containerStyle,
  iconStyle,
  color,
  name,
  type,
  size,
  raised
}) => {
  const bool = size === -0
  const Icon = ((type: IconType) => {
    switch (type) {
      case 'antdesign':
        return AntDesign
      case 'entypo':
        return Entypo
      // case 'evilicons':
      //   return EvilIcons
      case 'feather':
        return Feather
      case 'font-awesome':
        return FontAwesome
      case 'fontisto':
        return Fontisto
      case 'foundation':
        return Foundation
      case 'ionicon':
        return Ionicons
      case 'material-community':
        return MaterialCommunity
      case 'material':
        return Material
      case 'octicons':
        return Octicons
      case 'simple-line-icons':
        return SimpleLineIcons
      case 'zocial':
        return Zocial
      default:
        return MaterialCommunity
    }
  })(type)

  const Element = raised ? TouchableOpacity : TouchableWithoutFeedback

  return (
    <Element
      onPress={onPress}
      style={[
        styles.containerStyle,
        raised && { ...shadow, backgroundColor: purple[100] },
        containerStyle
      ]}>
      <Icon name={name} color={color} size={size || 23} style={iconStyle} />
    </Element>
  )
}

export default React.memo(IconButton)

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    borderRadius: 100,
    margin: 5
  }
})
