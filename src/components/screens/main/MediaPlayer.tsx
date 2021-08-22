import React, { useRef, useState } from 'react'
import { GestureResponderEvent, PanResponder, Pressable } from 'react-native'
import { Text, View, StyleSheet, Dimensions, Animated } from 'react-native'
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData
} from 'react-native-video'
import { Bar as ProgressBar } from 'react-native-progress'
import Header from '../../common/Header'
import { copper, gold, purple, purplePallet } from '../../common/style'
import { Divider, Icon } from 'react-native-elements'
import { Platform } from 'react-native'
import IconButton from '../../common/IconButton'
// import video from '../../../../assets/audio/audio.mp3'
const video = require('../../../../assets/videos/video.mp4')
import VideoPlayers from 'react-native-video-players'

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
  artist: string
  album: string
  duration?: string
  title: string
  type: 'audio' | 'video'
}

interface Dims {
  height: number
  width: number
}

interface MediaPlayerState {
  fullScreen: boolean
  error: string
  boxSize: Dims
  videoSize: Dims
  buffering: boolean
  animated: Animated.Value
  animatedOptions: Animated.Value
  animatedControl: Animated.Value
  optionsVisible: boolean
  muted: boolean
  paused: boolean
  progress: number
  duration: number
  currentTime: number
  orientation: 'landscape' | 'portrait'
  playInBackground: boolean
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  artist,
  album,
  title,
  type
}) => {
  let loopingAnimation: Animated.CompositeAnimation | undefined
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        triggerShowAndHide()
        return false
      }
    })
  ).current
  const player = useRef<Video>(null)
  let hideTimeout: NodeJS.Timeout | undefined = undefined

  const [state, setState] = useState<MediaPlayerState>({
    fullScreen: false,
    error: '',
    boxSize: { height: 0, width: 0 },
    videoSize: { height: 0, width: 0 },
    buffering: true,
    muted: false,
    animatedControl: new Animated.Value(0),
    animated: new Animated.Value(0),
    animatedOptions: new Animated.Value(0),
    optionsVisible: false,
    paused: false,
    currentTime: 0,
    progress: 0,
    duration: 0,
    orientation: getOrientation(),
    playInBackground: false
  })

  function getOrientation() {
    const { width, height } = Dimensions.get('window')
    return width > height ? 'landscape' : 'portrait'
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

  const handleProgressBarPress = ({ nativeEvent }: GestureResponderEvent) => {
    const position = nativeEvent.pageX
    const progress = (position / state.boxSize.width) * state.duration
    player?.current?.seek(progress)
  }

  const triggerShowAndHide = () => {
    console.log('showing')
    hideTimeout && clearTimeout(hideTimeout)

    Animated.timing(state.animatedControl, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()

    hideTimeout = setTimeout(() => {
      Animated.timing(state.animatedControl, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }, 1500)
  }

  const showOptionMenu = () => {
    const visible = state.optionsVisible
    setState({ ...state, optionsVisible: !visible })
    Animated.timing(state.animatedOptions, {
      toValue: visible ? 0 : 1,
      duration: 150,
      useNativeDriver: true
    }).start()
  }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted })
  }

  const {
    error,
    buffering,
    paused,
    progress,
    duration,
    boxSize,
    videoSize,
    fullScreen,
    muted,
    playInBackground
  } = state

  const videoDimensions = {
    width: ~~boxSize.width,
    height: ~~(videoSize.height * (boxSize.width / videoSize.width))
  }

  const interpolatedControls = state.animatedControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 43]
  })

  const controlHideStyle = {
    transform: [
      {
        translateY: interpolatedControls
      }
    ]
  }

  const interpolateOptionsMenu = state.animatedOptions.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0]
  })
  const optionsMenuStyle = {
    transform: [{ translateX: interpolateOptionsMenu }]
  }

  const hasError = Boolean(error)
  const interpolatedAnimation = state.animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360]
  })
  const rotateStyle = { transform: [{ rotate: interpolatedAnimation }] }
  // console.log('height: ' + videoSize.height)

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1 }}
        onLayout={({
          nativeEvent: {
            layout: { width, height }
          }
        }) => {
          console.log(width)
          setState({ ...state, boxSize: { width, height } })
        }}>
        <Header back title="Playing" />
        <View style={{ display: 'flex', flex: 1 }}>
          <VideoPlayers
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            }}
            isSettingShow={true}
            onMorePress={true}
            title={'Video title'}
            paused={paused}
            resizeMode={'contain'}
            playInBackground={true}
            playWhenInactive={true}
            controlTimeout={2000}
          />
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
    backgroundColor: gold[60],
    paddingVertical: 4
  },
  timersBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    color: '#fff'
  },
  control: {
    borderTopColor: gold[60],
    borderTopWidth: 3,
    flexDirection: 'row',
    paddingVertical: 5
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  track: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  artist: {
    color: gold[40],
    fontFamily: 'Roboto-Regular',
    fontSize: 30
  },
  title: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: 17,
    marginTop: 10
  },
  optionsMenu: {
    // height: 130,
    backgroundColor: purple[60],
    width: 200,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 80,
    borderColor: gold[60],
    borderWidth: 2,
    borderBottomWidth: 0
  },
  menuItem: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  menuItemText: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  menuItemIcon: {
    backgroundColor: 'transparent',
    padding: 0,
    width: 30
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    right: 0,
    top: -44,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  contorlIcon: { padding: 5 },
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
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  error: {
    // display: 'flex',
    // flex: 1,
    backgroundColor: '#000'
  }
})

export default MediaPlayer
