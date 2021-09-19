import React from 'react'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Header from './screens/common/Header'
import {flexColumn, pcl} from './screens/common/style'

const latest = [
  require('/assets/girly.jpg'),
  require('/assets/champions.jpeg'),
  require('/assets/ideas.jpeg'),
  require('/assets/gift.jpg'),
  require('/assets/master.jpeg'),
  require('/assets/intelligent.jpeg'),
]

const Tile: React.FC<{radius?: number; source: any}> = ({
  radius = 0,
  source,
}) => (
  <View style={styles.tileItem}>
    <Image
      style={{height: 80, width: 80, borderRadius: radius}}
      source={source}
    />
    <Text style={styles.text} numberOfLines={1}>
      Random Text
    </Text>
  </View>
)

const tile = (radius?: number): any => ({
  height: 100,
  width: 80,
  marginRight: 5,
  children: [
    {height: 80, width: 80, borderRadius: radius},
    {
      marginTop: 5,
      height: 14,
      width: 70,
      alignSelf: 'center',
    },
  ],
})

const Skeleton = () => {
  const {width} = useWindowDimensions()
  return (
    <View style={styles.container}>
      <Header title="PCL" showActionButtons={false} />
      <SkeletonContent
        containerStyle={{flex: 1, height: 300}}
        isLoading={true}
        layout={[
          {
            width,
            height: 210,
            children: [{width, height: 200}],
          },
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
          {
            width,
            height: 157,
            children: [
              {
                width: '80%',
                height: 20,
                marginLeft: 10,
              },
              {
                marginTop: 5,
                width: '50%',
                marginLeft: 10,
                height: 10,
              },
              {
                marginTop: 10,
                width,
                height: 100,
                paddingHorizontal: 20,
                flexDirection: 'row',
                children: [tile(50), tile(50), tile(50), tile(50), tile(50)],
              },
            ],
          },
          {
            width,
            height: 157,
            children: [
              {
                width: '70%',
                height: 20,
                marginLeft: 10,
              },
              {
                marginTop: 10,
                width,
                height: 100,
                paddingHorizontal: 20,
                flexDirection: 'row',
                children: [tile(30), tile(30), tile(30), tile(30), tile(30)],
              },
            ],
          },
          {
            width,
            height: 157,
            children: [
              {
                width,
                height: 20,
                flexDirection: 'row',
                children: [tile(), tile(), tile(), tile(), tile()],
              },
            ],
          },
        ]}
      />
    </View>
  )
}

export default Skeleton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pcl.background,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    backgroundColor: pcl.background,
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  tileContentContainer: {
    display: 'flex',
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tileItem: {
    marginRight: 10,
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
  text: {
    textAlign: 'center',
    paddingVertical: 3,
    color: '#222',
  },
})
