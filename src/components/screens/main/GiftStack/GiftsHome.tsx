import Header from 'components/screens/common/Header'
import {pcl, themeContainer} from 'components/screens/common/style'
import React, {useState} from 'react'
import {
  Alert,
  ImageBackground,
  StyleSheet,
  //   useWindowDimensions,
  View,
} from 'react-native'
import {Button} from 'react-native-elements'
import Offer from 'assets/offer.svg'
// import ConfettiCannon from 'react-native-confetti-cannon'
import Voucher from './Voucher'

const GiftsHome = () => {
  //   const confetti = useRef<ConfettiCannon | null>(null)
  const [showVoucherDialog, setShowVoucherDialog] = useState(false)

  return (
    <View style={themeContainer}>
      <Header title="Gifts" />
      <ImageBackground
        source={require('assets/gift25.jpg')}
        style={styles.container}
        imageStyle={{resizeMode: 'repeat'}}>
        <Button
          onPress={() => {
            console.log('fired', showVoucherDialog)
            setShowVoucherDialog(true)
          }}
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
          onPress={() => Alert.alert('You do not have any special offers.')}
        />
        {/* <ConfettiCannon
          autoStart={false}
          colors={[
            '#fdff689a',
            '#ff718d89',
            '#78ff4489',
            '#29cdff89',
            '#a864fd89',
            `${pcl.gold}89`,
          ]}
          fallSpeed={3000}
          ref={confetti}
          count={200}
          origin={{x: -10, y: 0}}
          onAnimationEnd={() =>
            setTimeout(() => confetti.current?.start(), 3000)
          }
        /> */}

        <Voucher
          visible={showVoucherDialog}
          setVisible={setShowVoucherDialog}
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
