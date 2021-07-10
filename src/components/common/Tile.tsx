import React from 'react'
import { TextStyle } from 'react-native'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle
} from 'react-native'

interface TileProps {
  title?: string
  imageSrc: ImageSourcePropType
  style?: ViewStyle
  imageStyle?: ImageStyle
  titleStyle?: TextStyle
}

const Tile: React.FC<TileProps> = ({
  title,
  imageSrc,
  style,
  imageStyle,
  titleStyle
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style
      }}>
      <Image
        source={imageSrc}
        resizeMode="cover"
        height={undefined}
        width={undefined}
        style={{ ...styles.image, ...imageStyle }}
      />
      {Boolean(title && title.length) && (
        <Text style={{ ...styles.text, ...titleStyle }} numberOfLines={1}>
          {title}
        </Text>
      )}
    </View>
  )
}

export default Tile

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 30
  },
  text: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#888'
  }
})
