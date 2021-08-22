declare module 'react-native-video-players' {
  import React from 'react'
  import { TextStyle, ViewProperties } from 'react-native'
  import Video, {
    OnBufferData,
    OnLoadData,
    OnProgressData
  } from 'react-native-video'

  export interface DefaultPropTypes extends ViewProperties {
    source: { uri: string | string[] }
    url?: string | string[]
    isAutoPlay?: boolean
    autoPlayFunc?: boolean
    loop?: boolean
    title?: string
    theme?: string
    hideFullScreenControl?: boolean
    style?: ViewStyle
    resizeMode?: 'contain'
    isRepeat?: boolean
    playInBackground?: boolean
    playWhenInactive?: boolean
    onLoad?: (data: OnLoadData) => void
    onProgress?: (data: OnProgressData) => void
    onEnd?: () => void
    onError?: (error: Error) => void
    onPlay?: (playing: boolean) => void
    paused?: boolean
    error?: boolean | object
    theme?: object
    controlTimeout?: number
    isFavoriteShow?: boolean
    favorite?: () => void
    isFavorite?: boolean
    isSettingShow?: boolean
    isVideoSettingsOpen?: boolean
    onMorePress?: boolean
    qualityArray?: string[] | ['320p', '480p', '720p', '1080p']
    autoConnectionStatus?: boolean
    IsAutoConnectionStatus?: () => void
    boxSelected?: boolean
    IsQualityArray?: (data: string, index: number) => void
    isShareShow?: boolean
    share?: () => void
    nextMedia?: () => void
    previousMedia?: () => void
    back?: () => void
    next?: () => void
    isShuffle?: boolean
    shuffle?: () => void
    backToList?: () => void
    onSeekRelease?: () => void
  }

  export default class VideoPlayers extends React.Component<DefaultPropTypes> {}
}
