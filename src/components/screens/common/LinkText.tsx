import React from 'react'
import {StyleSheet, Text, TextStyle} from 'react-native'
import {linkText, pcl} from './style'

interface LinkTextProps {
  onPress: () => void
  text: string
  style?: TextStyle
}

const LinkText: React.FC<LinkTextProps> = ({text, onPress, style}) => {
  return (
    <Text
      style={[
        styles.text,
        linkText,
        {color: pcl.blue, fontWeight: 'bold'},
        style,
      ]}
      onPress={onPress}>
      {text}
    </Text>
  )
}

export default LinkText

const styles = StyleSheet.create({
  text: {
    color: '#000b',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
