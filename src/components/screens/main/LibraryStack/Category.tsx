import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { PureComponent, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GENERIC_SERVER_ERROR } from '../../../../constants/errors'
import { MEDIA_PLAYER } from '../../../../constants/screens'
import { Media } from '../../../../models/media'
import { useAppDispatch } from '../../../../redux/hooks'
import { fetchCategoryItems } from '../../../../redux/slices/categoriesSlice'
import Header from '../../../common/Header'
import { greys, purplePallet, stretchedBox } from '../../../common/style'
import Tile from '../../../common/Tile'

interface ItemProps {
  playing?: boolean
  style?: ViewStyle
  divider?: boolean
  dividerColor?: string
  onPress: () => void
}

const seperatorWidth = 8

class Item extends PureComponent<
  Pick<Media, 'title' | 'author' | 'thumbnail'> & ItemProps
> {
  render() {
    const width = (Dimensions.get('window').width - seperatorWidth) / 2
    const { title, author, thumbnail, style, playing, onPress } = this.props
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.itemContainer,
          {
            backgroundColor: purplePallet.purpleDeeper
          },
          playing && { borderColor: purplePallet.text, borderWidth: 2 },
          style
        ]}>
        <Tile
          size={width}
          imageSrc={{ uri: thumbnail }}
          title={title}
          subHeader={author}
          titleStyle={{
            fontSize: 13,
            color: greys[20],
            paddingHorizontal: 5
          }}
          subHeaderStyle={{
            fontSize: 18,
            fontWeight: 'bold',
            color: purplePallet.text,
            paddingBottom: 10
          }}
          rounded={false}
          imageStyle={{
            height: playing ? width - 4 : width,
            width: playing ? width - 4 : width
          }}
        />
      </Pressable>
    )
  }
}

type ParamList = {
  Category: {
    name: string
    id: number
  }
}

const Category = () => {
  const { params } = useRoute<RouteProp<ParamList, 'Category'>>()
  const dispatch = useAppDispatch()
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { navigate } = useNavigation()

  useEffect(() => {
    if (typeof params === 'object' && !isNaN(params.id)) {
      setLoading(true)
      dispatch(fetchCategoryItems(9))
        .then(({ payload }) => {
          if (Array.isArray(payload)) {
            setMedia(payload)
          } else {
            setErrorMessage(GENERIC_SERVER_ERROR) // TODO: change to thunk response error
          }
        })
        .catch(() => setErrorMessage(GENERIC_SERVER_ERROR))
        .finally(() => setLoading(false))
    }
  }, [params.id])

  const renderItem = ({ item, index }: { item: Media; index: number }) => {
    return (
      <Item
        style={
          (index + 1) % 2 === 1
            ? {
                marginRight: seperatorWidth
              }
            : undefined
        }
        title={item.title}
        author={item.author}
        thumbnail={item.thumbnail}
        onPress={() => navigate(MEDIA_PLAYER, item)}
      />
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#fff0',
        height: seperatorWidth
      }}
    />
  )

  const keyExtractor = ({ id }: Media) => String(id)

  return (
    <SafeAreaView>
      <LinearGradient
        colors={[
          purplePallet.purpleDarker,
          purplePallet.purpleDarker,
          purplePallet.purpleLight
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={110}
        style={stretchedBox}>
        <Header back title={params.name || ''} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={media}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={keyExtractor}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Category

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
    color: greys[50],
    fontSize: 15,
    fontWeight: 'bold'
  }
})
