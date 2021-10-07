import React, {useEffect, useState, PureComponent} from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {CategoryIconI, IconName} from '../../../../types/Category'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks'
import Music from 'assets/music.svg'
const ebook = require('assets/ebook.png')
import Video from 'assets/video.svg'
import {useNavigation} from '@react-navigation/native'
import {
  gold,
  copper,
  greys,
  stretchedBox,
  pcl,
} from 'components/screens/common/style'
import Header from 'components/screens/common/Header'
import {LibraryParamList} from '.'
import {StackNavigationProp} from '@react-navigation/stack'
import {Divider, Icon} from 'react-native-elements'
import Tile from 'components/screens/common/Tile'
import {fetchMedia, selectMedia} from 'redux/slices/mediaResourceSlice'
import {selectAuth} from 'redux/slices/authSlice'

interface ItemProps {
  style?: ViewStyle
  divider?: boolean
  dividerColor?: string
  onPress?: () => void
}

class Item extends PureComponent<
  {
    name: string
    id: string
    numberOfItems: number
    icon?: CategoryIconI | IconName
  } & ItemProps
> {
  getIcon(icon?: IconName | string) {
    if (typeof icon === 'string' || icon === undefined) {
      let iconColor = pcl.black
      switch (icon) {
        case 'eBook':
          return <Image source={ebook} style={{width: 30, height: 30}} />
        case 'Video':
          return <Video width={30} height={30} color={iconColor} />
        case 'Audio':
          return <Music width={30} height={30} color={iconColor} />
        case 'Downloaded':
          return <Entypo name="download" size={30} color={iconColor} />
        case 'Playlist':
          return (
            <MaterialCommunityIcons
              name="playlist-play"
              size={30}
              color={iconColor}
            />
          )
        default:
          return <Music width={30} height={30} color={iconColor} />
      }
    }

    let {name, size, type, color} = icon
    color = color || greys[40]
    return <Icon color={color} name={name} size={size} type={type} />
  }

  render() {
    const {name, numberOfItems, style, onPress} = this.props
    return (
      <TouchableOpacity style={[styles.itemContainer, style]} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          {this.getIcon(name)}
          <Text style={styles.itemText}>{`${name} (${numberOfItems})`}</Text>
        </View>
        <Ionicons name="chevron-forward" size={30} color={pcl.black} />
      </TouchableOpacity>
    )
  }
}

type LibraryProp = StackNavigationProp<LibraryParamList, 'LibraryScreen'>

const Library = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const {categories, errorMessage} = useAppSelector(selectMedia)
  const {navigate} = useNavigation<LibraryProp>()
  const {token} = useAppSelector(selectAuth)
  const [error, setError] = useState(false)

  // console.log(media, errorMessage)

  useEffect(() => {
    // console.log('effecting', token)
    if (Boolean(token)) {
      setLoading(true)
      dispatch(fetchMedia())
        .then((res: any) => {
          if (res.type !== '/media/home/fulfilled') {
            setError(false)
          }
          // console.log(res)
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }
  }, [token])

  return (
    <View style={stretchedBox}>
      <Header title="Library" />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          {Object.keys(categories).map(item => (
            <View key={item}>
              <Item
                id={item}
                name={item}
                numberOfItems={categories[item].length}
                onPress={() =>
                  navigate('Category', {
                    id: item,
                    name: item,
                  })
                }
              />
              <Divider width={8} color={pcl.background} />
            </View>
          ))}
          <View style={{backgroundColor: pcl.white, paddingVertical: 20}}>
            <Text style={{marginLeft: 20, marginBottom: 10}}>
              Recently Played
            </Text>
            <ScrollView horizontal>
              {categories?.Vidoes?.map(
                ({resource_id, title, thumbnail_url}) => (
                  <Tile
                    size={130}
                    key={resource_id}
                    style={{marginRight: 10, marginLeft: 5}}
                    imageStyle={{borderRadius: 0}}
                    imageSrc={{uri: thumbnail_url}}
                    title={title}
                  />
                ),
              )}
            </ScrollView>
          </View>
          <Divider width={10} color={pcl.background} />
          <View style={{backgroundColor: pcl.white, paddingVertical: 20}}>
            <Text style={{marginLeft: 20, marginBottom: 10}}>
              Listening History
            </Text>
            <ScrollView>
              {categories?.Playlist?.map(
                ({resource_id, title, thumbnail_url}) => (
                  <View key={resource_id}>
                    <Tile
                      horizontal
                      size={70}
                      style={{marginRight: 10, marginLeft: 5, padding: 5}}
                      imageStyle={{borderRadius: 10}}
                      imageSrc={{uri: thumbnail_url}}
                      title={title}
                    />
                    <Divider width={2} color={pcl.background} />
                  </View>
                ),
              )}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Library

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: pcl.white,
  },
  itemText: {
    marginLeft: 10,
    textAlign: 'center',
    color: pcl.black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
  },
})
