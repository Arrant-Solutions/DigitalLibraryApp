import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { purplePallet } from './src/components/common/style'
import AppEntry from './src/components/screens/AppEntry'
import { store } from './src/redux/store'

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: purplePallet.purpleDarker,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: purplePallet.brown,
    border: purplePallet.purpleDark,
    notification: 'rgb(255, 69, 58)'
  }
}

const App = () => {
  // const scheme = useColorScheme()
  // console.log(scheme)
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
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
    flex: 1,
    backgroundColor: purplePallet.purpleDeep
  }
})
