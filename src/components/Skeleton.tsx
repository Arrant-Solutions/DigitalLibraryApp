import {BlurView} from '@react-native-community/blur'
import React from 'react'
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Header from './screens/common/Header'
import PCLStatusBar from './screens/common/PCLStatusBar'
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

const Skeleton = () => {
  if (true) {
    return (
      <View style={styles.container}>
        <PCLStatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <ImageBackground
          style={styles.container}
          source={require('/assets/skeleton.jpg')}
        />
      </View>   
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Register" showActionButtons={false} />
      <ScrollView>
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
          <Text style={styles.tileHeader}>Latest Uplifting Releases</Text>
          <ScrollView horizontal style={styles.tileContentContainer}>
            {latest
              .sort(() => 0.5 - Math.random())
              .map(item => (
                <Tile source={item} key={item} />
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
            {latest
              .sort(() => 0.5 - Math.random())
              .map(item => (
                <Tile source={item} key={item} radius={100} />
              ))}
          </ScrollView>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.tileContainer}>
          <Text style={styles.tileHeader}>Most Played titles</Text>
          <ScrollView horizontal style={styles.tileContentContainer}>
            {latest
              .sort(() => 0.5 - Math.random())
              .map(item => (
                <Tile source={item} key={item} radius={10} />
              ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* <BlurView
        blurType="light"
        blurAmount={20}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        reducedTransparencyFallbackColor="white"
      /> */}
    </View>
  )
}

export default Skeleton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pcl.background,
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
