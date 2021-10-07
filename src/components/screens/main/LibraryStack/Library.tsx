import React, {useEffect, useState, PureComponent} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {CategoryI, CategoryIconI, IconName} from '../../../../types/Category'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks'
import Anointing from 'assets/anointing.svg'
import Book from 'assets/book.svg'
import CampusMinistries from 'assets/campus_ministries.svg'
import Children from 'assets/children.svg'
import ChristianLiving from 'assets/christian_living.svg'
import Classics from 'assets/classics.svg'
import Evangelism from 'assets/evangelism.svg'
import Faith from 'assets/faith.svg'
import Finance from 'assets/finance.svg'
import FoundationSchool from 'assets/foundation.svg'
import Freebies from 'assets/freebies.svg'
import GospelWorld from 'assets/gospel_world.svg'
import Health from 'assets/health.svg'
import HolySpirit from 'assets/holy_spirit.svg'
import Leader from 'assets/leader.svg'
import Lifestyle from 'assets/lifestyle.svg'
import QuestionAndAnswer from 'assets/question_and_answer.svg'
import SoulWinning from 'assets/soul_winning.svg'
import Teens from 'assets/teens.svg'
import Thanksgiving from 'assets/thanksgiving.svg'
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
  getIcon(icon?: CategoryIconI | IconName) {
    if (typeof icon === 'string' || icon === undefined) {
      let iconColor = pcl.black
      switch (icon) {
        case 'anointing':
          return <Anointing width={30} height={30} color={copper[70]} />
        case 'book':
          return <Book width={30} height={30} color={iconColor} />
        case 'campus_ministry':
          return <CampusMinistries width={30} height={30} color={iconColor} />
        case 'children':
          return <Children width={30} height={30} color={iconColor} />
        case 'christian_living':
          return <ChristianLiving width={30} height={30} color={iconColor} />
        case 'classics':
          return <Classics width={30} height={30} color={gold[40]} />
        case 'evangelism':
          return <Evangelism width={30} height={30} color={iconColor} />
        case 'faith':
          return <Faith width={30} height={30} color={iconColor} />
        case 'finance':
          return <Finance width={30} height={30} color={iconColor} />
        case 'foundation':
          return <FoundationSchool width={60} height={60} color={iconColor} />
        case 'freebies':
          return <Freebies width={30} height={30} color={iconColor} />
        case 'health':
          return <Health width={30} height={30} color={iconColor} />
        case 'holy_spirit':
          return <HolySpirit width={30} height={30} color={iconColor} />
        case 'gospel_world':
          return <GospelWorld width={50} height={50} color={iconColor} />
        case 'leader':
          return <Leader width={30} height={30} color={iconColor} />
        case 'lifestyle':
          return <Lifestyle width={30} height={30} color={iconColor} />
        case 'question_and_answer':
          return <QuestionAndAnswer width={50} height={50} color={iconColor} />
        case 'soul_winning':
          return <SoulWinning width={30} height={30} color={iconColor} />
        case 'teens':
          return <Teens width={30} height={30} color={iconColor} />
        case 'video':
          return <Video width={30} height={30} color={iconColor} />
        case 'thanksgiving':
        default:
          return <Thanksgiving width={30} height={30} color={iconColor} />
      }
    }

    let {name, size, type, color} = icon
    color = color || greys[40]
    return <Icon color={color} name={name} size={size} type={type} />
  }

  render() {
    const {name, numberOfItems, icon, style, onPress} = this.props
    return (
      <TouchableOpacity style={[styles.itemContainer, style]} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          {this.getIcon(icon)}
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
          if (res.type === '/media/home/fulfilled') {
            setError(false)
          }
          // console.log(res)
        })
        .catch(setError(true))
        .finally(() => setLoading(false))
    }
  }, [token])

  console.log('Error =====> ', errorMessage, categories)
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
              {categories.Vidoes.map(({resource_id, title, thumbnail_url}) => (
                <Tile
                  size={130}
                  key={resource_id}
                  style={{marginRight: 10, marginLeft: 5}}
                  imageStyle={{borderRadius: 0}}
                  imageSrc={{uri: thumbnail_url}}
                  title={title}
                />
              ))}
            </ScrollView>
          </View>
          <Divider width={10} color={pcl.background} />
          <View style={{backgroundColor: pcl.white, paddingVertical: 20}}>
            <Text style={{marginLeft: 20, marginBottom: 10}}>
              Listening History
            </Text>
            <ScrollView>
              {categories.Playlist.map(
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
