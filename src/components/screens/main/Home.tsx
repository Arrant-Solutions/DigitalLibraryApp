import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import { Tile } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { flexColumn } from '../../common/style'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tile
        featured
        height={265}
        imageSrc={require('../../../../assets/images/banner.png')}
      />
      <View style={styles.divider}></View>
      <ScrollView horizontal style={styles.tileContainer}>
        <Tile
          featured
          title="Lorem ipsum dolor sit amet, consectetur"
          width={175}
          imageSrc={require('../../../../assets/images/master.jpeg')}
        />
        <Tile
          featured
          title="Lorem ipsum dolor sit amet, consectetur"
          width={175}
          // height={265}
          imageSrc={require('../../../../assets/images/champions.jpeg')}
        />
        <Tile
          featured
          title="Lorem ipsum dolor sit amet, consectetur"
          width={175}
          // height={265}
          imageSrc={require('../../../../assets/images/ideas.jpeg')}
        />
        <Tile
          featured
          title="Lorem ipsum dolor sit amet, consectetur"
          width={175}
          // height={265}
          imageSrc={require('../../../../assets/images/intelligent.jpeg')}
        />
      </ScrollView>
      <View style={styles.divider}></View>
      <ScrollView horizontal style={styles.tileContainer}></ScrollView>
      <View style={styles.divider}></View>
      <ScrollView horizontal style={styles.tileContainer}></ScrollView>
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
  tileContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff'
  },
  divider: {
    borderRadius: 5,
    height: 10,
    backgroundColor: '#eee',
    marginHorizontal: 3
  }
})
