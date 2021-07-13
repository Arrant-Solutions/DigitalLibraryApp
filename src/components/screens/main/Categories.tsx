import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { flexRow, purplePallet, stretchedBox } from '../../common/style'

const Categories = () => {
  const { width } = useWindowDimensions()
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[
          purplePallet.purpleDarker,
          purplePallet.purpleDarker,
          purplePallet.purpleLight
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={110}
        style={stretchedBox}>
        <StatusBar backgroundColor={purplePallet.purpleDeep} />
        <Header
          backgroundColor={purplePallet.purpleDeep}
          leftComponent={
            <View style={[flexRow, { width, alignItems: 'center' }]}>
              <Icon name="logo-android" color="#fff" type="ionicon" size={20} />
              <Text style={{ marginLeft: 10, color: '#fff', fontSize: 20 }}>
                Categories
              </Text>
            </View>
          }
          rightComponent={{
            icon: 'ios-ellipsis-vertical-sharp',
            color: '#fff',
            type: 'ionicon'
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Categories

const styles = StyleSheet.create({})
