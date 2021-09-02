import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from 'components/screens/common/Header'
import {purplePallet, stretchedBox, greys} from '../common/style'

const Favorites = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[
          purplePallet.purpleDarker,
          purplePallet.purpleDarker,
          purplePallet.purpleLight,
        ]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle
        angle={110}
        style={stretchedBox}>
        <Header title="Favourites" />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
  itemText: {
    textAlign: 'center',
    color: greys[30],
    fontSize: 15,
    fontWeight: 'bold',
  },
})
