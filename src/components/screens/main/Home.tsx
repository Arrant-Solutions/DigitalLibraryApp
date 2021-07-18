import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  useWindowDimensions
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchLatest,
  restoreLatest,
  selectHomeResources
} from '../../../redux/slices/homeResourcesSlice'
import { flexColumn } from '../../common/style'
import Tile from '../../common/Tile'

const Home = () => {
  const dispatch = useAppDispatch()
  const { errorMessage, latest } = useAppSelector(selectHomeResources)
  // const [media, setMedia] = useState<HomeMediaItem[]>([])

  useEffect(() => {
    dispatch(restoreLatest())
      .then(({ payload }: any) => {
        if (Array.isArray(payload.latest) && payload.latest.length === 0) {
          dispatch(fetchLatest())
        }
      })
      .catch(() => {
        dispatch(fetchLatest())
      })
  }, [])
  // console.log(latest)
  // const { height } = useWindowDimensions()
  // const [tileHeight] = useState(
  //   (height - 265 - 60 - useBottomTabBarHeight()) / 3
  // )
  // console.log('tileHeight', tileHeight)
  // console.log('tb height', useBottomTabBarHeight())
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ display: 'flex', height: 265 }}>
          <Image
            source={require('../../../../assets/images/banner.png')}
            resizeMode="cover"
            style={{
              flex: 1,
              height: undefined,
              width: undefined
            }}
          />
        </View>
        <View style={styles.divider}></View>
        <View style={styles.tileContainer}>
          <Text style={styles.tileHeader}>Latest Uplifting Releases</Text>
          <ScrollView horizontal style={styles.tileContentContainer}>
            {latest.slice(0, 8).map(({ thumbnail, title }) => (
              <Tile
                style={{ marginRight: 10 }}
                imageSrc={{ uri: thumbnail }}
                title={title}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.tileContainer}>
          <View style={{ ...flexColumn, paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 20 }}>More of what you like</Text>
            <Text style={{ fontSize: 12, color: '#777' }}>
              Suggestions based on your previous views
            </Text>
          </View>
          <ScrollView horizontal style={styles.tileContentContainer}>
            {latest.slice(9, 15).map(({ thumbnail, title }) => (
              <Tile
                style={{ marginRight: 10 }}
                imageStyle={{ borderRadius: 0 }}
                imageSrc={{ uri: thumbnail }}
                title={title}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.tileContainer}>
          <Text style={styles.tileHeader}>Most Played titles</Text>
          <ScrollView horizontal style={styles.tileContentContainer}>
            {latest.slice(15, 20).map(({ thumbnail, title }) => (
              <Tile
                key={thumbnail}
                style={{ marginRight: 10 }}
                imageStyle={{ borderRadius: 100 }}
                imageSrc={{ uri: thumbnail }}
                title={title}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    ...flexColumn,
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {},
  tileContentContainer: {
    display: 'flex',
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  tileHeader: {
    color: '#888',
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  tileContainer: {
    display: 'flex',
    height: 157,
    backgroundColor: '#fff'
  },
  tileImage: {
    height: 90,
    width: 90,
    borderRadius: 30
  },
  divider: {
    borderRadius: 5,
    height: 10,
    backgroundColor: '#eee',
    marginHorizontal: 3
  }
})
