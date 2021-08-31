import React from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-elements'
import {IconNode} from 'react-native-elements/dist/icons/Icon'
import {pcl} from './style'

interface PCLButtonProps {
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  title: string
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  icon?: IconNode | undefined
}

const PCLButton: React.FC<PCLButtonProps> = ({
  containerStyle,
  buttonStyle,
  titleStyle,
  title,
  icon,
  onPress,
}) => {
  return (
    <Button
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      title={title}
      icon={icon}
      onPress={onPress}
    />
  )
}

export default PCLButton

const styles = StyleSheet.create({
  containerStyle: {
    margin: 8,
    borderRadius: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: pcl.gold,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: pcl.purple,
  },
})
