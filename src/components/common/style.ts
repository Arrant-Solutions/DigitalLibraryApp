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

export const gold = {
  100: '#a67c00',
  80: '#bf9b30',
  60: '#ffbf00',
  40: '#ffcf40',
  20: '#ffdc73'
}

export const copper = {
  100: '#db6923',
  90: '#de7838',
  80: '#e2874e',
  70: '#e59665',
  60: '#e9a57b',
  50: '#edb491',
  40: '#f0c3a7',
  30: '#f4d2bd',
  20: '#f7e1d3',
  10: '#fbf0e9'
}

export const greys = {
  100: '#888888',
  90: '#939393',
  80: '#9f9f9f',
  70: '#ababab',
  60: '#b7b7b7',
  50: '#c3c3c3',
  40: '#cfcfcf',
  30: '#dbdbdb',
  20: '#e7e7e7',
  10: '#f3f3f3'
}

export const purplePallet = {
  textLight: '#fff',
  text: '#ffe245',
  purpleLight: '#cf4ab7',
  purpleDark: '#bb4ed9',
  purpleDarker: '#6c30cc',
  purpleDeep: '#400d88',
  purpleDeeper: '#380b78',
  brown: '#403034',
  copper: '#db6923'
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
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
    // flex: 1
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
    // flex: 1
  },
  socialButton: {
    borderRadius: 10,
    paddingHorizontal: 30,
    display: 'flex',
    flex: 1
  },
  stretchedBox: {
    height: '100%',
    width: '100%'
  }
})

export const {
  container: themeContainer,
  linkText,
  flexColumn,
  flexRow,
  socialButton,
  stretchedBox
} = style
