import React, {PureComponent} from 'react'
import {TextStyle} from 'react-native'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import {Icon} from 'react-native-elements'
import {toPlayDate} from 'utils'
import {flexColumn} from './style'

interface TileProps {
  size?: number
  title?: string
  subHeader?: string
  lastPlayed?: Date
  imageSrc: ImageSourcePropType
  style?: ViewStyle
  imageStyle?: ImageStyle
  titleStyle?: TextStyle
  subHeaderStyle?: TextStyle
  rounded?: boolean
  horizontal?: boolean
}

interface TileState {
  playing: boolean
}
class Tile extends PureComponent<TileProps, TileState> {
  state = {
    playing: false,
  }

  render() {
    const {
      size = 90,
      title,
      subHeader,
      lastPlayed,
      imageSrc,
      style,
      imageStyle,
      titleStyle,
      subHeaderStyle,
      rounded = true,
      horizontal,
    } = this.props
    return (
      <View
        style={[
          styles.container,
          {width: size},
          style,
          horizontal && {flexDirection: 'row'},
        ]}>
        <Image
          source={imageSrc}
          resizeMode="cover"
          height={undefined}
          width={undefined}
          style={[
            styles.image,
            {width: size, height: size},
            imageStyle,
            !rounded && {borderRadius: 0},
          ]}
        />
        <View
          style={[styles.textContainer, horizontal && {paddingHorizontal: 20}]}>
          {Boolean(title && title.length) && (
            <Text style={[styles.text, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {Boolean(subHeader && subHeader.length) && (
            <Text
              style={[styles.subHeaderText, subHeaderStyle]}
              numberOfLines={1}>
              {subHeader}
            </Text>
          )}
          {horizontal && (
            <View style={flexColumn}>
              <Icon
                type={'ionicon'}
                name={this.state.playing ? 'playing' : 'paused'}
                color={'black'}
                size={20}
              />
              <Text>
                {this.state.playing
                  ? 'Now Playing'
                  : toPlayDate(lastPlayed || new Date())}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default Tile

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 30,
  },
  textContainer: {
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#888',
  },
  subHeaderText: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#888',
  },
})
