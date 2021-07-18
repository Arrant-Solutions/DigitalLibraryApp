import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Media } from '../../models/media'

interface MediaPlayerPropsI {
  file?: string
}

const MediaPlayer: React.FC<MediaPlayerPropsI & Media> = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default MediaPlayer

const styles = StyleSheet.create({})
