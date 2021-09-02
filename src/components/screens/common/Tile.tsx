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

interface TileProps {
  size?: number
  title?: string
  subHeader?: string
  imageSrc: ImageSourcePropType
  style?: ViewStyle
  imageStyle?: ImageStyle
  titleStyle?: TextStyle
  subHeaderStyle?: TextStyle
  rounded?: boolean
}
class Tile extends PureComponent<TileProps> {
  render() {
    const {
      size = 90,
      title,
      subHeader,
      imageSrc,
      style,
      imageStyle,
      titleStyle,
      subHeaderStyle,
      rounded = true,
    } = this.props
    return (
      <View style={[styles.container, {width: size}, style]}>
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
