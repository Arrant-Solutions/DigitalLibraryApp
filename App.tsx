import React from 'react'
import 'react-native-gesture-handler'
import {
  NavigationContainer,
  DefaultTheme,
  NavigationContainerRef,
} from '@react-navigation/native'
import analytics from '@react-native-firebase/analytics'
import MainNavigation from 'components/MainNavigation'
import {pcl} from 'components/screens/common/style'
import {StyleSheet} from 'react-native'
import {Provider} from 'react-redux'
import {store} from './src/redux/store'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: pcl.purple,
    background: pcl.background,
    card: pcl.background,
    text: pcl.black,
    border: pcl.gold,
    notification: 'rgb(255, 69, 58)',
  },
}

const App = () => {
  const routeNameRef = React.useRef()
  const navigationRef =
    React.useRef<
      React.Ref<NavigationContainerRef<ReactNavigation.RootParamList>>
    >()

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef => void}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current
            const currentRouteName =
              navigationRef?.current?.getCurrentRoute().name

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              })
            }
            routeNameRef.current = currentRouteName
          }}>
          <MainNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: pcl.background,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
})
