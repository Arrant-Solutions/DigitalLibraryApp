import React, { PureComponent } from 'react'
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
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { greys, warning } from './style'

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

interface TileState {
  loading: boolean
  error: boolean
}

export class Tile extends PureComponent<TileProps, TileState> {
  constructor(props: TileProps) {
    super(props)

    this.state = {
      loading: false,
      error: false
    }
  }

  render() {
    const { loading, error } = this.state
    const {
      size = 90,
      title,
      subHeader,
      imageSrc,
      style,
      imageStyle,
      titleStyle,
      subHeaderStyle,
      rounded = true
    } = this.props

    return (
      <View style={[styles.container, { width: size }, style]}>
        {loading && <Fontisto name="picture" size={50} color={greys[40]} />}
        {error && (
          <Ionicons name="warning-outline" size={50} color={warning[100]} />
        )}
        <Image
          onLoadStart={() => this.setState({ ...this.state, loading: true })}
          onLoadEnd={() => this.setState({ ...this.state, loading: false })}
          onError={() => this.setState({ ...this.state, error: true })}
          source={imageSrc}
          resizeMode="cover"
          height={undefined}
          width={undefined}
          style={[
            styles.image,
            { width: size, height: size },
            imageStyle,
            !rounded && { borderRadius: 0 },
            (error || loading) && { height: 0 }
          ]}
        />
        {Boolean(!loading && !error && title && title.length) && (
          <Text style={[styles.text, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {Boolean(!loading && !error && subHeader && subHeader.length) && (
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
    alignItems: 'center'
  },
  image: {
    borderRadius: 30
  },
  text: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#888'
  },
  subHeaderText: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#888'
  }
})
