import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Splash = () => {
  const { container } = styles
  return (
    <View style={container}>
      <Text>Unable to retrieve required assets</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
