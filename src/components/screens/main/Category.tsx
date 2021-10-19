import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import React, {PureComponent, useEffect, useState} from 'react'
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import analytics from '@react-native-firebase/analytics'
import {useAppSelector} from '../../../redux/hooks'
import Header from 'components/screens/common/Header'
import {
  greys,
  pcl,
  purplePallet,
  stretchedBox,
} from 'components/screens/common/style'
import Tile from 'components/screens/common/Tile'
import {LibraryParamList} from './LibraryStack'
import {StackNavigationProp} from '@react-navigation/stack'
import {selectMedia} from 'redux/slices/mediaResourceSlice'
import {ResourceItemT} from 'types/Resource'
import {BaseParamList} from 'components/MainNavigation'
import {selectAuth} from 'redux/slices/authSlice'

interface ItemProps {
  playing?: boolean
  style?: ViewStyle
  divider?: boolean
  dividerColor?: string
  onPress: () => void
}

const seperatorWidth = 8

class Item extends PureComponent<
  Pick<
    ResourceItemT,
    | 'title'
    | 'author_title'
    | 'author_first_name'
    | 'author_last_name'
    | 'author_suffix'
    | 'thumbnail_url'
  > &
    ItemProps
> {
  render() {
    const width = (Dimensions.get('window').width - seperatorWidth) / 2
    const {
      title,
      author_title,
      author_first_name,
      author_last_name,
      author_suffix,
      thumbnail_url,
      style,
      playing,
      onPress,
    } = this.props
    const author =
      `${author_title} ${author_first_name} ${author_last_name} ${author_suffix}`.trim()
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.itemContainer,
          {
            backgroundColor: pcl.white,
          },
          playing && {borderColor: purplePallet.text, borderWidth: 2},
          style,
        ]}>
        <Tile
          size={width}
          imageSrc={{uri: thumbnail_url}}
          title={title}
          subHeader={author}
          titleStyle={{
            fontSize: 13,
            color: pcl.textPlaceholder,
            paddingHorizontal: 5,
          }}
          subHeaderStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: pcl.black,
            paddingBottom: 10,
          }}
          rounded={false}
          imageStyle={{
            height: playing ? width - 4 : width,
            width: playing ? width - 4 : width,
          }}
        />
      </Pressable>
    )
  }
}

type ParamList = {
  Category: {
    name: string
    id: string
  }
}

type LibraryProp = StackNavigationProp<
  LibraryParamList & BaseParamList,
  'Category'
>

const Category = () => {
  const {params} = useRoute<RouteProp<ParamList, 'Category'>>()
  const [media, setMedia] = useState<ResourceItemT[]>([])
  const {navigate} = useNavigation<LibraryProp>()
  const {categories} = useAppSelector(selectMedia)
  const {user} = useAppSelector(selectAuth)

  useEffect(() => {
    // console.log(params, ~Object.keys(categories).indexOf(params.id))
    if (
      typeof params === 'object' &&
      ~Object.keys(categories).indexOf(params.id)
    ) {
      setMedia(categories[params.id])
    }
  }, [params.id])

  const renderItem = ({item, index}: {item: ResourceItemT; index: number}) => {
    return (
      <Item
        style={
          (index + 1) % 2 === 1
            ? {
                marginRight: seperatorWidth,
              }
            : undefined
        }
        title={item.title}
        author_title={item.author_title}
        author_first_name={item.author_first_name}
        author_last_name={item.author_last_name}
        author_suffix={item.author_suffix}
        thumbnail_url={item.thumbnail_url}
        onPress={() => {
          analytics().logEvent('played', {
            resource_url: item.resource_url,
            thumbnail_url: item.thumbnail_url,
            email: user?.email,
            type: item.resource_type_name,
            category: item.resource_category_name
          })
          if (/ebook/i.test(item.resource_category_name)) {
            navigate('PDF Viewer', {resource: item})
          } else {
            navigate('Media Player', {resource: item})
          }
        }}
      />
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#fff0',
        height: seperatorWidth,
      }}
    />
  )

  const keyExtractor = ({resource_id}: ResourceItemT) => String(resource_id)

  return (
    <View style={stretchedBox}>
      <Header back title={params.name || ''} />
      {params.name === 'favorites' && !media.length ? (
        <Text style={{margin: 8, color: pcl.black}}>
          You do not have any favorites
        </Text>
      ) : (
        <FlatList
          data={media}
          ItemSeparatorComponent={renderSeparator}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
    color: greys[50],
    fontSize: 15,
    fontWeight: 'bold',
  },
})
