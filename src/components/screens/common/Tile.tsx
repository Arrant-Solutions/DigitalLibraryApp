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
import {TouchableOpacity} from 'react-native-gesture-handler'
import {toPlayDate} from 'utils'
import {flexColumn, flexRow, pcl} from './style'

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
  onPress?: () => void
}

class Tile extends PureComponent<TileProps> {
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
      onPress,
    } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          !horizontal && {width: size},
          style,
          horizontal && {flexDirection: 'row'},
        ]}>
        <>
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
            style={[
              styles.textContainer,
              horizontal && {
                paddingHorizontal: 20,
                flex: 1,
              },
            ]}>
            {Boolean(title && title.length) && (
              <Text
                style={[
                  styles.text,
                  titleStyle,
                  horizontal && {textAlign: 'left'},
                ]}
                numberOfLines={1}>
                {title}
              </Text>
            )}
            {Boolean(subHeader && subHeader.length) && (
              <Text
                style={[
                  styles.subHeaderText,
                  subHeaderStyle,
                  horizontal && {textAlign: 'left'},
                ]}
                numberOfLines={1}>
                {subHeader}
              </Text>
            )}
          </View>
        </>
      </TouchableOpacity>
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
