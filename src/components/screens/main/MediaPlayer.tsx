import React, { Component } from 'react'
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

// interface LoadError {
//   error: {
//     code: number
//     domain: string
//     localizedDescription: string
//     localizedFailureReason: string
//     localizedRecoverySuggestion: string
//   }
//   target: number
// }

function trailZero(dividend: number, divisor: number): string {
  const result = ~~(dividend / divisor)

  return result < 10 ? `0${result}` : String(result)
}

function secondsToTime(seconds: number) {
  const secs = trailZero(seconds % 60, 1)

  if (seconds > 60 * 60) {
    const hours = trailZero(seconds, 60 * 60)
    const minutes = trailZero(seconds - Number(hours) * 60 * 60, 60)

    return hours + ':' + minutes + ':' + secs
  }
  return trailZero(seconds, 60) + ':' + secs
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
  orientation: 'landscape' | 'portrait'
}

export default class MediaPlayer extends Component<
  MediaPlayerProps,
  MediaPlayerState
> {
  loopingAnimation: Animated.CompositeAnimation | undefined
  player: Video | null
  animated = new Animated.Value(0)
  hideTimeout: NodeJS.Timeout | undefined = undefined

  constructor(props: MediaPlayerProps) {
    super(props)

    this.state = {
      error: '',
      boxSize: { height: 0, width: 0 },
      videoSize: { height: 0, width: 0 },
      buffering: true,
      animated: new Animated.Value(0),
      paused: false,
      progress: 0,
      duration: 0,
      orientation: this.getOrientation()
    }

    this.player = null
    this.loopingAnimation = undefined
  }

  getOrientation() {
    const { width, height } = Dimensions.get('window')
    return width > height ? 'landscape' : 'portrait'
  }

  onLayout() {
    this.setState({ orientation: this.getOrientation() })
  }

  // because of wrong type in react-native-video correct type is as in LoadError above
  handleError = (meta: any) => {
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

    this.setState({
      error
    })
  }

  triggerBufferAnimation = () => {
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      })
    )
    this.loopingAnimation.start()
  }

  handleLoadStart = () => {
    this.triggerBufferAnimation()
  }

  handleBuffer = ({ isBuffering }: OnBufferData) => {
    isBuffering && this.triggerBufferAnimation()
    if (this.loopingAnimation && !isBuffering) {
      this.loopingAnimation.stop()
    }
    this.setState({ buffering: isBuffering })
  }

  handleLoad = (data: OnLoadData) => {
    const {
      naturalSize: { width, height }
    } = data
    this.setState(state => ({
      ...state,
      duration: data.duration,
      videoSize: { width, height }
    }))
  }

  handleProgress = (data: OnProgressData) => {
    this.setState(state => ({
      ...state,
      progress: data.currentTime / state.duration
    }))
  }

  handleEnd = () => {
    if (Math.round(this.state.progress) >= 1) {
      this.player?.seek(0)
    }
    this.setState(state => ({ ...state, paused: true }))
  }

  handleMainTouch = () => {
    this.setState(state => ({ ...state, paused: !state.paused }))
  }

  handleProgressBarPress = (event: GestureResponderEvent, barWidth: number) => {
    const position = event.nativeEvent.locationX
    const progress = (position / barWidth) * this.state.duration
    this.player?.seek(progress)
  }

  handleVideoPress = () => {
    this.triggerShowAndHide()
  }

  triggerShowAndHide = () => {
    this.hideTimeout && clearTimeout(this.hideTimeout)

    Animated.timing(this.animated, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()

    this.hideTimeout = setTimeout(() => {
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }, 1500)
  }

  render() {
    const { error, buffering, paused, progress, duration, boxSize, videoSize } =
      this.state
    const time = secondsToTime(Math.floor(progress * duration))
    const timeWidth = time.length > 5 ? 62 : 40
    const progressWidth = boxSize.width - 20 - timeWidth - 90
    const videoDimensions = {
      width: ~~boxSize.width,
      height: ~~(videoSize.height * (boxSize.width / videoSize.width))
    }

    const interpolatedControls = this.animated.interpolate({
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
    const interpolatedAnimation = this.state.animated.interpolate({
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
            this.setState({ boxSize: { width, height } })
          }}>
          <Header back title="Playing" />
          <View style={{ overflow: 'hidden' }}>
            <Pressable onPress={this.handleVideoPress}>
              <Video
                // repeat
                source={
                  //   {
                  //     uri: 'https://commondatastorages.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  //   }
                  video
                }
                paused={this.state.paused}
                volume={0}
                resizeMode="contain"
                style={[videoDimensions]}
                onError={this.handleError}
                onLoad={this.handleLoad}
                onProgress={this.handleProgress}
                onLoadStart={this.handleLoadStart}
                onEnd={this.handleEnd}
                onBuffer={this.handleBuffer}
                ref={ref => (this.player = ref)}
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
            <Animated.View style={[styles.controls, controlHideStyle]}>
              <Pressable onPress={this.handleMainTouch}>
                <Icon
                  name={!paused ? 'pause' : 'play'}
                  size={30}
                  color="#fff"
                />
              </Pressable>
              <Pressable
                onPress={e => this.handleProgressBarPress(e, progressWidth)}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: purplePallet.purpleDeep
  },
  video: {
    // display: 'flex',
    // flex: 1,
    width: '100%',
    height: 500
  },
  controlsContainer: {},
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
