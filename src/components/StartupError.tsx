import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Icon} from 'react-native-elements'
import GlassyCard from './screens/common/GlassyCard'
import {pcl} from './screens/common/style'

const Splash = () => {
  const {container} = styles
  return (
    <GlassyCard
      blurAmount={0}
      containerStyle={{height: 'auto'}}
      solidContainerStyle={{backgroundColor: pcl.background, padding: 20}}
      cardContainerStyle={{padding: 20, paddingVertical: 30}}
      colors={[pcl.background, pcl.background]}>
      <Icon
        name="warning-outline"
        type="ionicon"
        size={90}
        color={pcl.danger}
      />
      <Text style={styles.text}>
        Unable to retrieve required assets. Please ensure your internet is
        reachable.
      </Text>
    </GlassyCard>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20
  }
})
