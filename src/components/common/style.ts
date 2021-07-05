import { StyleSheet } from 'react-native'

export const skyBlue = {
  90: '#19c5ff',
  80: '#33ccff',
  70: '#4dd2ff',
  60: '#66d9ff',
  50: '#80dfff',
  40: '#99e5ff',
  30: '#b3ecff',
  20: '#ccf2ff',
  10: '#e6f9ff'
}

export const purplePallet = {
  textLight: '#fff',
  text: '#ffe245',
  purpleLight: '#cf4ab7',
  purpleDark: '#bb4ed9',
  purpleDarker: '#6c30cc',
  purpleDeep: '#400d88',
  purpleDeeper: '#380b78',
  brown: '#403034'
}

export const themeBlack = '#111111'

export const themePurple1 = '#bb4ed9'

export const themePurple2 = '#cf4ab7'

export const themeFocusInputBorder = '#63215d'

export const themeDefaultInputBorder = '#1d1d1d'

export const themeInputBackgroundColor = '#181818'

export const themeText = '#f2f2f2'

export const themeTextGray = '#757575'

export const googleBlue = '#4285F4'

export const theme = {
  black: '#111111',
  purpleLight: '#bb4ed9',
  purpleDark: '#cf4ab7',
  focusInputBorder: '#63215d',
  defaultInputBorder: '#1d1d1d',
  inputBackgroundColor: '#181818',
  text: '#f2f2f2',
  textGray: '#757575'
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    display: 'flex',
    flex: 1
  },
  linkText: {
    color: skyBlue[90]
  }
})

export const { container: themeContainer, linkText } = style
