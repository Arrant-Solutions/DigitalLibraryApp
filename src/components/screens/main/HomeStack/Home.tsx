import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks'
import {flexColumn} from 'components/screens/common/style'
import Tile from '../../common/Tile'
import Skeleton, {tile} from 'components/Skeleton'
import {data} from 'redux/services/data'
import {selectAuth} from 'redux/slices/authSlice'
import {selectMedia, fetchMedia} from 'redux/slices/mediaResourceSlice'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import {BaseParamList} from 'components/MainNavigation'
import {StackNavigationProp} from '@react-navigation/stack'
import {HomeParamList} from '.'
import {useNavigation} from '@react-navigation/native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export const TileSkeleton: React.FC<{isLoading: boolean}> = ({isLoading}) => {
  const {width} = useWindowDimensions()
  return (
    <SkeletonContent
      isLoading={isLoading}
      layout={[
        {
          width,
          height: 157,
          children: [
            {
              width: width - 60,
              height: 20,
              alignSelf: 'center',
            },
            {
              marginTop: 10,
              width,
              height: 20,
              flexDirection: 'row',
              children: [tile(), tile(), tile(), tile(), tile()],
            },
          ],
        },
      ]}
    />
  )
}

type HomeNavProps = StackNavigationProp<
  HomeParamList & BaseParamList,
  'HomeScreen'
>

const Home = () => {
  const {navigate} = useNavigation<HomeNavProps>()
  const dispatch = useAppDispatch()
  const {token} = useAppSelector(selectAuth)
  const {categories} = useAppSelector(selectMedia)
  const [error, setError] = useState(false)
  // const {data, error, isLoading} = useGetMediaQuery()
  // const [media, setMedia] = useState<HomeMediaItem[]>([])
  // console.log(JSON.stringify(Object.keys(categories), null, 2))
  const [loading, setLoading] = useState(false)

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

  if (loading) {
    return <Skeleton />
  }

  if (!data || error) {
    // Alert.alert(
    //   'Error Occured',
    //   'Unable to fetch your media resource. Please check your internet.',
    // )
    return <Text>Home Failed {JSON.stringify(error)}</Text>
    // return <Skeleton />
  }

  return (
    <View style={{flex: 1}}>
      {/* <PCLStatusBar backgroundColor={pcl.purple} /> */}
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={{display: 'flex', height: 265}}>
            <Image
              source={require('assets/banner.png')}
              resizeMode="cover"
              style={{
                flex: 1,
                height: undefined,
                width: undefined,
              }}
            />
          </View>
          <View style={styles.divider}></View>
          <View style={styles.tileContainer}>
            <Text style={styles.tileHeader}>Trending</Text>
            <ScrollView horizontal style={styles.tileContentContainer}>
              {categories?.Video?.map(item => (
                <Tile
                  key={item.resource_id}
                  style={{marginRight: 10}}
                  imageSrc={{uri: item.thumbnail_url}}
                  title={item.title}
                  onPress={() => {
                    console.log('=======>  ', item.resource_category_name)
                    if (/ebook/i.test(item.resource_category_name)) {
                      console.log('=======>  ', item.resource_category_name)
                      navigate('PDF Viewer', {resource: item})
                    } else {
                      navigate('Media Player', {resource: item})
                    }
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.tileContainer}>
            <View style={{...flexColumn, paddingHorizontal: 30}}>
              <Text style={{fontSize: 20}}>More of what you like</Text>
              <Text style={{fontSize: 12, color: '#777'}}>
                Suggestions based on your previous views
              </Text>
            </View>
            <ScrollView horizontal style={styles.tileContentContainer}>
              {categories?.Audio?.map(item => (
                <Tile
                  key={item.resource_id}
                  style={{marginRight: 10}}
                  imageStyle={{borderRadius: 10}}
                  imageSrc={{uri: item.thumbnail_url}}
                  title={item.title}
                  onPress={() => {
                    console.log('=======>  ', item.resource_category_name)
                    if (/ebook/i.test(item.resource_category_name)) {
                      console.log('=======>  ', item.resource_category_name)
                      navigate('PDF Viewer', {resource: item})
                    } else {
                      navigate('Media Player', {resource: item})
                    }
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.tileContainer}>
            <Text style={styles.tileHeader}>eBook</Text>
            <ScrollView horizontal style={styles.tileContentContainer}>
              {categories?.eBook?.map(item => (
                <Tile
                  key={item.resource_id}
                  style={{marginRight: 10}}
                  imageStyle={{borderRadius: 0}}
                  imageSrc={{uri: item.thumbnail_url}}
                  title={item.title}
                  onPress={() => {
                    console.log('=======>  ', item.resource_category_name)
                    if (/ebook/i.test(item.resource_category_name)) {
                      console.log('=======>  ', item.resource_category_name)
                      navigate('PDF Viewer', {resource: item})
                    } else {
                      navigate('Media Player', {resource: item})
                    }
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    ...flexColumn,
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#f00',
  },
  scrollView: {},
  tileContentContainer: {
    display: 'flex',
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tileHeader: {
    color: '#888',
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  tileContainer: {
    display: 'flex',
    height: 157,
    backgroundColor: '#fff',
  },
  tileImage: {
    height: 90,
    width: 90,
    borderRadius: 30,
  },
  divider: {
    borderRadius: 5,
    height: 10,
    backgroundColor: '#eee',
    marginHorizontal: 3,
  },
})
