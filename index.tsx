/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import { theme } from './theme'

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
