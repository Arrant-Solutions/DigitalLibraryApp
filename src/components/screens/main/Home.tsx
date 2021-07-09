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
import { Tile } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { HomeMediaItem } from '../../../models/media'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectHomeResources } from '../../../redux/slices/homeResourcesSlice'
import { flexColumn } from '../../common/style'

const Home = () => {
  const dispatch = useAppDispatch()
  const {errorMessage, latest} = useAppSelector(selectHomeResources)
  // const [media, setMedia] = useState<HomeMediaItem[]>([])

  useEffect(() => {

  }, [])

  const { width, height } = useWindowDimensions()
  const [tileHeight] = useState(
    (height - 265 - 60 - useBottomTabBarHeight()) / 3
  )
  console.log('tileHeight', tileHeight)
  console.log('tb height', useBottomTabBarHeight())
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
            <View
              style={{
                // height: tileHeight,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 90
              }}>
              <Image
                source={require('../../../../assets/images/champions.jpeg')}
                resizeMode="cover"
                height={undefined}
                width={undefined}
                style={{ height: 90, width: 90, borderRadius: 30 }}
              />
              <Text
                style={{ textAlign: 'center', paddingVertical: 3 }}
                numberOfLines={1}>
                Champions Diary
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.divider}></View>
        <ScrollView horizontal style={styles.tileContainer}>
          <Text>More of what you like</Text>
          <Text>Suggestions based on your previous views (square)</Text>
        </ScrollView>
        <View style={styles.divider}></View>
        <ScrollView horizontal style={styles.tileContainer}>
          <Text>Most Played Titles (round)</Text>
        </ScrollView>
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
