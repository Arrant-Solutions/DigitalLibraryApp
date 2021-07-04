import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { Provider } from 'react-redux'
import AppEntry from './src/components/screens/AppEntry'
import { store } from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppEntry />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
})
