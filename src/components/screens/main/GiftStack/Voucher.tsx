import {pcl} from 'components/screens/common/style'
import React, {useEffect, useState} from 'react'
import {Alert, Image, StyleSheet, Text, View} from 'react-native'
import {Button, Icon, Input, Overlay} from 'react-native-elements'

interface VoucherProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const Voucher: React.FC<VoucherProps> = ({
  visible: showModal,
  setVisible: setShowModal,
}) => {
  const [visible, setVisible] = useState(showModal)
  const [showLabel, setShowLabel] = useState(false)
  const [voucher, setVoucher] = useState('')

  useEffect(() => {
    setVisible(showModal)
  }, [showModal])

  const toggleOverlay = () => {
    const state = !visible
    setVisible(state)
    setShowModal(state)
    setVoucher('')
  }

  const handleReedemVoucher = () => {
    if (voucher.length) Alert.alert('Invalid Voucher Code')
  }

  return (
    <View>
      <Overlay
        overlayStyle={{padding: 0, borderRadius: 5}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            width: 300,
            height: 300,
            borderRadius: 5,
          }}>
          <View style={styles.banner}>
            <View
              style={{
                padding: 5,
                backgroundColor: pcl.giftBackground,
                borderRadius: 80,
                alignSelf: 'center',
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}
                source={require('assets/gift.jpg')}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
              padding: 10,
              paddingHorizontal: 20,
            }}>
            <Input
              onFocus={() => setShowLabel(true)}
              onBlur={() => setShowLabel(false)}
              value={voucher}
              onChangeText={value => setVoucher(value)}
              label={showLabel ? 'Gift Voucher Code' : '  '}
              placeholder={showLabel ? '' : 'Gift Voucher Code'}
              leftIcon={
                <Icon name="gift" type="octicon" size={24} color="black" />
              }
            />

            <Button
              onPress={handleReedemVoucher}
              containerStyle={{marginHorizontal: 10}}
              buttonStyle={{
                borderRadius: 8,
                backgroundColor: `${pcl.purple}`,
              }}
              titleStyle={{fontSize: 15, color: pcl.white}}
              type="outline"
              title="Redeem Voucher"
            />
          </View>
        </View>
      </Overlay>
    </View>
  )
}

export default Voucher

const styles = StyleSheet.create({
  banner: {
    backgroundColor: pcl.gold,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
})
