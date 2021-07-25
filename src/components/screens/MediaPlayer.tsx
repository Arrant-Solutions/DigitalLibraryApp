import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import { Media } from '../../models/media'
import Header from '../common/Header'
const video = require('../../../assets/audio/audio.mp3')

interface MediaPlayerPropsI {
  file?: string
}

const MediaPlayer: React.FC<MediaPlayerPropsI & Media> = props => {
  console.log(props)
  let player: Video | null = null

  const onBuffer = () => {
    console.log('buffering')
  }

  const videoError = (e: any) => {
    console.log(e)
    console.log('failed to load video')
  }

  return (
    <View style={styles.container}>
      <Header back title="Playing" />
      {/* <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
        shouldPlay
        useNativeControls
        style={{ width: '100%', height: '50%' }}
      /> */}
      <Video
        selectedTextTrack={{
          type: 'title',
          value: 'English Subtitles'
        }}
        controls
        style={styles.player}
        source={video}
        ref={ref => {
          player = ref
        }}
        onBuffer={onBuffer}
        onError={videoError}
      />
    </View>
  )
}

export default MediaPlayer

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'red'
  },
  player: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'yellow'
  }
})
