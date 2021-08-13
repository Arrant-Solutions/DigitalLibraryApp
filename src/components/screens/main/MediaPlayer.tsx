import React, { Component, useRef, useState } from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
  VideoProperties
} from 'react-native-video'
import { Bar as ProgressBar } from 'react-native-progress'
import Header from '../../common/Header'
import { purplePallet } from '../../common/style'
// import video from '../../../../assets/audio/audio.mp3'
const video = require('../../../../assets/videos/video.mp4')

function trailZero(dividend: number, divisor: number): string {
  const result = ~~(dividend / divisor)

  return result < 10 ? `0${result}` : String(result)
}

function secondsToTime(seconds: number) {
  const isNegative = seconds < 0
  const absSeconds = Math.abs(seconds)
  const secs = trailZero(absSeconds % 60, 1)

  if (absSeconds > 60 * 60) {
    const hours = trailZero(absSeconds, 60 * 60)
    const minutes = trailZero(absSeconds - Number(hours) * 60 * 60, 60)

    return hours + ':' + minutes + ':' + secs
  }
  return (isNegative ? '-' : '') + trailZero(absSeconds, 60) + ':' + secs
}

interface MediaPlayerProps {
  item: string
}

interface Dims {
  height: number
  width: number
}

interface MediaPlayerState {
  error: string
  boxSize: Dims
  videoSize: Dims
  buffering: boolean
  animated: Animated.Value
  paused: boolean
  progress: number
  duration: number
  currentTime: number
  orientation: 'landscape' | 'portrait'
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({}) => {
  let loopingAnimation: Animated.CompositeAnimation | undefined
  const player = useRef<Video>(null)
  let animated = new Animated.Value(0)
  let hideTimeout: NodeJS.Timeout | undefined = undefined

  const [state, setState] = useState<MediaPlayerState>({
    error: '',
    boxSize: { height: 0, width: 0 },
    videoSize: { height: 0, width: 0 },
    buffering: true,
    animated: new Animated.Value(0),
    paused: false,
    currentTime: 0,
    progress: 0,
    duration: 0,
    orientation: getOrientation()
  })

  function getOrientation() {
    const { width, height } = Dimensions.get('window')
    return width > height ? 'landscape' : 'portrait'
  }

  const onLayout = () => {
    setState({ ...state, orientation: getOrientation() })
  }

  // because of wrong type in react-native-video correct type is as in LoadError above
  const handleError = (meta: any) => {
    const {
      error: { code }
    } = meta

    let error = 'error occurred playing video'

    switch (code) {
      case -11800:
      case -11000:
        error = 'Could not load video from url'
        break
    }

    setState({
      ...state,
      error
    })
  }

  const triggerBufferAnimation = () => {
    loopingAnimation = Animated.loop(
      Animated.timing(state.animated, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true
      })
    )
    loopingAnimation.start()
  }

  const handleLoadStart = () => {
    triggerBufferAnimation()
  }

  const handleBuffer = ({ isBuffering }: OnBufferData) => {
    isBuffering && triggerBufferAnimation()
    if (loopingAnimation && !isBuffering) {
      loopingAnimation.stop()
    }
    setState({ ...state, buffering: isBuffering })
  }

  const handleLoad = (data: OnLoadData) => {
    const {
      naturalSize: { width, height }
    } = data
    setState(state => ({
      ...state,
      duration: data.duration,
      videoSize: { width, height }
    }))
  }

  const handleProgress = (data: OnProgressData) => {
    setState(state => ({
      ...state,
      progress: data.currentTime / state.duration,
      currentTime: data.currentTime
    }))
  }

  const handleEnd = () => {
    if (Math.round(state.progress) >= 1) {
      player?.current?.seek(0)
    }
    setState(state => ({ ...state, paused: true }))
  }

  const handleMainTouch = () => {
    setState(state => ({ ...state, paused: !state.paused }))
  }

  const handleProgressBarPress = (
    event: GestureResponderEvent,
    barWidth: number
  ) => {
    const position = event.nativeEvent.locationX
    const progress = (position / barWidth) * state.duration
    player?.current?.seek(progress)
  }

  const handleVideoPress = () => {
    triggerShowAndHide()
  }

  const triggerShowAndHide = () => {
    hideTimeout && clearTimeout(hideTimeout)

    Animated.timing(animated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()

    hideTimeout = setTimeout(() => {
      Animated.timing(animated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }, 1500)
  }

  const { error, buffering, paused, progress, duration, boxSize, videoSize } =
    state
  const time = secondsToTime(Math.floor(progress * duration))
  const timeWidth = time.length > 5 ? 62 : 40
  const progressWidth = boxSize.width - 20 - timeWidth - 90
  const videoDimensions = {
    width: ~~boxSize.width,
    height: ~~(videoSize.height * (boxSize.width / videoSize.width))
  }

  const interpolatedControls = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 0]
  })

  const controlHideStyle = {
    transform: [
      {
        translateY: interpolatedControls
      }
    ]
  }

  const hasError = Boolean(error)
  const interpolatedAnimation = state.animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360]
  })
  const rotateStyle = { transform: [{ rotate: interpolatedAnimation }] }

  return (
    <View style={styles.container}>
      <View
        style={{
          // backgroundColor: 'red',
          flex: 1
          // position: 'relative',
          // height: 100
        }}
        onLayout={({
          nativeEvent: {
            layout: { width, height }
          }
        }) => {
          setState({ ...state, boxSize: { width, height } })
        }}>
        <Header back title="Playing" />
        <View style={{ overflow: 'hidden' }}>
          <Pressable onPress={handleVideoPress}>
            <Video
              // repeat
              source={
                //   {
                //     uri: 'https://commondatastorages.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                //   }
                video
              }
              paused={state.paused}
              volume={0}
              resizeMode="contain"
              style={[videoDimensions]}
              onError={handleError}
              onLoad={handleLoad}
              onProgress={handleProgress}
              onLoadStart={handleLoadStart}
              onEnd={handleEnd}
              onBuffer={handleBuffer}
              ref={player}
            />
            <View style={styles.videoCover}>
              {!hasError && (
                <Icon name="exclamation-triangle" size={30} color="red" />
              )}
              {!hasError && <Text>{error}</Text>}
              {!buffering && (
                <Animated.View style={rotateStyle}>
                  <Icon name="circle-o-notch" size={30} color="#fff" />
                </Animated.View>
              )}
            </View>
          </Pressable>
          <View style={[styles.controlsContainer, { backgroundColor: 'pink' }]}>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={progress}
                color="red"
                unfilledColor="#fff"
                borderColor="#fff"
                borderWidth={0}
                borderRadius={10}
                width={boxSize.width}
                height={5}
                useNativeDriver
              />
            </View>
            <View style={styles.timersBox}>
              <Text style={styles.timeText}>
                {secondsToTime(state.currentTime)}
              </Text>
              <Text style={styles.timeText}>
                {secondsToTime(state.currentTime - state.duration)}
              </Text>
            </View>
          </View>
          <Animated.View style={[styles.controls, controlHideStyle]}>
            <Pressable onPress={handleMainTouch}>
              <Icon name={!paused ? 'pause' : 'play'} size={30} color="#fff" />
            </Pressable>
            <Pressable onPress={e => handleProgressBarPress(e, progressWidth)}>
              <View>
                <ProgressBar
                  progress={progress}
                  color="#fff"
                  unfilledColor="rgba(255, 255, 255, .5)"
                  borderColor="#fff"
                  width={progressWidth}
                  height={20}
                />
              </View>
            </Pressable>
            <Text
              numberOfLines={1}
              style={[styles.duration, { width: timeWidth }]}>
              {time}
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: purplePallet.purpleDeep
  },
  video: {
    width: '100%',
    height: 500
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingVertical: 4
  },
  timersBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeText: {
    fontFamily: 'RobotoMono-Regular',
    color: 'blue',
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0,1)',
    height: 48,
    left: 0,
    right: 0,
    bottom: 0,
    // top: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10
  },
  duration: {
    color: '#fff'
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.0)'
  },
  error: {
    // display: 'flex',
    // flex: 1,
    backgroundColor: '#000'
  }
})

export default React.memo(MediaPlayer)