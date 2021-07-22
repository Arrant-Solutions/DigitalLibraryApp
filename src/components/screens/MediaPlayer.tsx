// import { Video } from 'expo-av'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Media } from '../../models/media'

interface MediaPlayerPropsI {
  file?: string
}

const MediaPlayer: React.FC<MediaPlayerPropsI & Media> = props => {
  console.log(props)
  // let player: Video | null = null

  // const onBuffer = () => {
  //   console.log('buffering')
  // }

  // const videoError = () => {
  //   console.log('failed to load video')
  // }

  return (
    <View style={styles.container}>
      {/* <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
        shouldPlay
        useNativeControls
        style={{ width: '100%', height: '50%' }}
      /> */}
      {/* <Video
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' ||
            props.url
        }}
        ref={ref => {
          player = ref
        }}
        onBuffer={onBuffer}
        onError={videoError}
      /> */}
    </View>
  )
}

export default MediaPlayer

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
})
