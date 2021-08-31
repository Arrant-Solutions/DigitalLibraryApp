import 'react-native-gesture-handler'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import MainNavigation from 'components/MainNavigation'
import {purplePallet, pcl} from 'components/screens/common/style'
import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {Provider} from 'react-redux'
import {store} from './src/redux/store'

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
    notification: 'rgb(255, 69, 58)',
  },
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <SafeAreaView style={styles.container}>
          <MainNavigation />
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
    backgroundColor: pcl.background,
  },
})
