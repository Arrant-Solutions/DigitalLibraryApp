/**
 * @format
 */

import { AppRegistry } from 'react-native'
import React from 'react'
import { ThemeProvider, Button } from 'react-native-elements'
import App from './App'
import { name as appName } from './app.json'
import { theme } from './theme'

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
