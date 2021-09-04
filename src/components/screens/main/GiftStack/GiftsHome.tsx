import Header from 'components/screens/common/Header'
import {pcl, themeContainer} from 'components/screens/common/style'
import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import Offer from 'assets/offer.svg'

const GiftsHome = () => {
  return (
    <View style={themeContainer}>
      <Header title="Gifts" />
      <ImageBackground
        source={require('assets/gift.jpg')}
        style={styles.container}
        imageStyle={{resizeMode: 'repeat'}}>
        <Button
          containerStyle={{margin: 10, marginTop: 20}}
          buttonStyle={{
            borderRadius: 8,
            backgroundColor: `${pcl.purple}`,
          }}
          titleStyle={{fontSize: 22, color: pcl.white}}
          type="outline"
          icon={{
            name: 'gift',
            type: 'octicon',
            size: 30,
            color: pcl.gold,
            containerStyle: {marginRight: 20},
          }}
          title="Gift Voucher"
        />
        <Button
          containerStyle={{margin: 10}}
          buttonStyle={{
            borderRadius: 8,
            backgroundColor: `${pcl.purple}`,
          }}
          titleStyle={{fontSize: 22, color: pcl.white}}
          type="outline"
          icon={
            <Offer
              color={pcl.gold}
              height={30}
              width={30}
              style={{marginRight: 20}}
            />
          }
          title="Special Offer"
        />
      </ImageBackground>
    </View>
  )
}

export default GiftsHome

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: pcl.background,
  },
  card: {},
})
