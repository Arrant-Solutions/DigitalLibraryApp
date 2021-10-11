import React, {useRef, useState} from 'react'
import {GestureResponderEvent, PanResponder, Pressable} from 'react-native'
import {Text, View, StyleSheet, Dimensions, Animated} from 'react-native'
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video'
import {Bar as ProgressBar} from 'react-native-progress'
import {Divider, Icon} from 'react-native-elements'
import {Platform} from 'react-native'
import Header from '../common/Header'
import IconButton from '../common/IconButton'
import {gold, copper, purple, pcl} from '../common/style'
import {RouteProp, useRoute} from '@react-navigation/native'
import {ResourceItemT} from 'types/Resource'
// import video from '../../../../assets/audio/audio.mp3'
// const video = require('../../../../assets/videos/video.mp4')

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

type ParamList = {
  MediaPlayer: {
    resource: ResourceItemT
  }
}

const MediaPlayer = () => {
  const {params} = useRoute<RouteProp<ParamList, 'MediaPlayer'>>()
  const [resource] = useState(params?.resource)
  let loopingAnimation: Animated.CompositeAnimation | undefined
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        triggerShowAndHide()
        return false
      },
    }),
  ).current
  const player = useRef<Video>(null)
  let hideTimeout: NodeJS.Timeout | undefined = undefined

  const [state, setState] = useState<MediaPlayerState>({
    fullScreen: false,
    error: '',
    boxSize: {height: 0, width: 0},
    videoSize: {height: 0, width: 0},
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
    playInBackground: false,
  })

  function getOrientation() {
    const {width, height} = Dimensions.get('window')
    return width > height ? 'landscape' : 'portrait'
  }

  // because of wrong type in react-native-video correct type is as in LoadError above
  const handleError = (meta: any) => {
    const {
      error: {code},
    } = meta

    console.log(JSON.stringify(meta, null, 2))
    let error = 'error occurred playing video'

    switch (code) {
      case -11800:
      case -11000:
        error = 'Could not load video from url'
        break
    }

    setState({
      ...state,
      error,
    })
  }

  const triggerBufferAnimation = () => {
    loopingAnimation = Animated.loop(
      Animated.timing(state.animated, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true,
      }),
    )
    loopingAnimation.start()
  }

  const handleLoadStart = () => {
    triggerBufferAnimation()
  }

  const handleBuffer = ({isBuffering}: OnBufferData) => {
    isBuffering && triggerBufferAnimation()
    if (loopingAnimation && !isBuffering) {
      loopingAnimation.stop()
    }
    setState({...state, buffering: isBuffering})
  }

  const handleLoad = (data: OnLoadData) => {
    const {
      naturalSize: {width, height},
    } = data
    setState(state => ({
      ...state,
      duration: data.duration,
      videoSize: {width, height},
    }))
  }

  const handleProgress = (data: OnProgressData) => {
    setState(state => ({
      ...state,
      progress: data.currentTime / state.duration,
      currentTime: data.currentTime,
    }))
  }

  const handleEnd = () => {
    if (Math.round(state.progress) >= 1) {
      player?.current?.seek(0)
    }
    setState(state => ({...state, paused: true}))
  }

  const handleMainTouch = () => {
    setState(state => ({...state, paused: !state.paused}))
  }

  const handleProgressBarPress = ({nativeEvent}: GestureResponderEvent) => {
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
      useNativeDriver: true,
    }).start()

    hideTimeout = setTimeout(() => {
      Animated.timing(state.animatedControl, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, 1500)
  }

  const showOptionMenu = () => {
    const visible = state.optionsVisible
    setState({...state, optionsVisible: !visible})
    Animated.timing(state.animatedOptions, {
      toValue: visible ? 0 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  const handleMute = () => {
    setState({...state, muted: !state.muted})
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
    playInBackground,
  } = state

  const videoDimensions = {
    width: ~~boxSize.width,
    height: ~~(videoSize.height * (boxSize.width / videoSize.width)),
  }

  const interpolatedControls = state.animatedControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 43],
  })

  const controlHideStyle = {
    transform: [
      {
        translateY: interpolatedControls,
      },
    ],
  }

  const interpolateOptionsMenu = state.animatedOptions.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })
  const optionsMenuStyle = {
    transform: [{translateX: interpolateOptionsMenu}],
  }

  const hasError = Boolean(error)
  const interpolatedAnimation = state.animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  })
  const rotateStyle = {} // {transform: [{rotate: interpolatedAnimation}]}
  // console.log('height: ' + videoSize.height)

  return (
    <View style={styles.container}>
      <View
        style={{flex: 1}}
        onLayout={({
          nativeEvent: {
            layout: {width, height},
          },
        }) => {
          console.log(width)
          setState({...state, boxSize: {width, height}})
        }}>
        <Header back title="Playing" />
        <View style={{}}>
          <View
            {...panResponder.panHandlers}
            style={{overflow: 'hidden', height: 220}}>
            <Video
              repeat={false}
              source={
                {
                  uri:
                    params?.resource?.resource_url ||
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }
                // video
              }
              onFullscreenPlayerDidDismiss={() =>
                setState({...state, fullScreen: false})
              }
              playInBackground={playInBackground}
              fullscreen={fullScreen}
              fullscreenOrientation="landscape"
              muted={muted}
              paused={paused}
              volume={100}
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
            <Animated.View style={[styles.controls, controlHideStyle]}>
              <IconButton
                containerStyle={styles.contorlIcon}
                color="#fff"
                onPress={handleMute}
                type="octicons"
                name={state.muted ? 'unmute' : 'mute'}
              />
              <IconButton
                onPress={() =>
                  setState({...state, fullScreen: !state.fullScreen})
                }
                containerStyle={styles.contorlIcon}
                color="#fff"
                type="feather"
                name="maximize"
              />
            </Animated.View>
            <View
              style={[
                styles.videoCover,
                !hasError && {backgroundColor: 'transparent'},
              ]}>
              {hasError && (
                <>
                  <Icon
                    type="font-awesome"
                    name="exclamation-triangle"
                    size={30}
                    color="red"
                  />
                  <Text style={{color: '#fff'}}>{error}</Text>
                </>
              )}

              {!hasError && buffering && (
                <Animated.View style={rotateStyle}>
                  <Icon
                    type="font-awesome"
                    name="circle-o-notch"
                    size={30}
                    color="#fff"
                  />
                </Animated.View>
              )}
            </View>
          </View>
          {!hasError && (
            <View style={[styles.controlsContainer]}>
              <Pressable
                onPress={handleProgressBarPress}
                style={styles.progressContainer}>
                <ProgressBar
                  progress={progress}
                  color="#fff"
                  unfilledColor={pcl.black}
                  borderColor="#fff"
                  borderWidth={0}
                  borderRadius={0}
                  width={boxSize.width}
                  height={10}
                  useNativeDriver
                />
              </Pressable>
              <View style={styles.timersBox}>
                <Text style={styles.timeText}>
                  {secondsToTime(state.currentTime)}
                </Text>
                <Text style={styles.timeText}>
                  {secondsToTime(state.currentTime - state.duration)}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            flex: 1,
            display: 'flex',
          }}>
          <View style={styles.track}>
            <Text style={styles.artist}>
              {`${resource?.author_title} ${resource?.author_first_name} ${resource?.author_last_name} `.trim()}
            </Text>
            <Text style={styles.title}>{resource?.title}</Text>
          </View>
          <Animated.View style={[styles.optionsMenu, optionsMenuStyle]}>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setState({
                  ...state,
                  animatedOptions: new Animated.Value(0),
                  optionsVisible: false,
                })
              }}>
              <IconButton
                type="material"
                name="playlist-add"
                size={25}
                color="white"
                containerStyle={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Add to playlist</Text>
            </Pressable>
            <Divider />
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setState({
                  ...state,
                  animatedOptions: new Animated.Value(0),
                  optionsVisible: false,
                })
              }}>
              <IconButton
                type="entypo"
                name="edit"
                size={20}
                color="white"
                containerStyle={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Properties</Text>
            </Pressable>
            <Divider />
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setState({
                  ...state,
                  animatedOptions: new Animated.Value(0),
                  optionsVisible: false,
                })
              }}>
              <IconButton
                type="material"
                name="delete-forever"
                size={20}
                color="white"
                containerStyle={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Delete</Text>
            </Pressable>
            <Divider />
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setState({
                  ...state,
                  animatedOptions: new Animated.Value(0),
                  optionsVisible: false,
                })
              }}>
              <IconButton
                type="ionicon"
                name="play"
                size={20}
                color="white"
                containerStyle={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>Play in Background</Text>
            </Pressable>
          </Animated.View>
          <View style={styles.control}>
            <IconButton
              containerStyle={{backgroundColor: 'transparent'}}
              raised
              name="playlist-play"
              type="material"
              color={pcl.purple}
              size={40}
              onPress={() => console.log('hello')}
            />
            <View style={styles.actions}>
              <IconButton
                raised
                name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-play-back'}
                type="ionicon"
                color={copper[70]}
                onPress={() => console.log('hello')}
              />
              <IconButton
                raised
                name={paused ? 'play' : 'pause'}
                type="ionicon"
                color={copper[70]}
                onPress={handleMainTouch}
              />
              <IconButton
                raised
                name={(Platform.OS === 'ios' ? 'ios' : 'md') + '-play-forward'}
                type="ionicon"
                color={copper[70]}
                onPress={() => console.log('hello')}
              />
            </View>
            <IconButton
              containerStyle={{backgroundColor: 'transparent'}}
              raised
              name={
                (Platform.OS === 'ios' ? 'ios' : 'md') +
                '-ellipsis-vertical-sharp'
              }
              type="ionicon"
              color={pcl.purple}
              onPress={showOptionMenu}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pcl.background,
  },
  video: {
    width: '100%',
    height: 500,
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  progressContainer: {
    backgroundColor: '#000',
    paddingVertical: 3,
    marginTop: -1,
  },
  timersBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    color: pcl.black,
  },
  control: {
    borderTopColor: gold[60],
    borderTopWidth: 3,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    color: pcl.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    color: pcl.black,
    fontSize: 17,
    marginTop: 10,
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
    borderBottomWidth: 0,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  menuItemText: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  menuItemIcon: {
    backgroundColor: 'transparent',
    padding: 0,
    width: 30,
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
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  contorlIcon: {padding: 5},
  duration: {
    color: '#fff',
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  error: {
    // display: 'flex',
    // flex: 1,
    backgroundColor: '#000',
  },
})

export default MediaPlayer
