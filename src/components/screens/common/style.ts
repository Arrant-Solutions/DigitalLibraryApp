import {StyleSheet} from 'react-native'

export const skyBlue = {
  90: '#19c5ff',
  80: '#33ccff',
  70: '#4dd2ff',
  60: '#66d9ff',
  50: '#80dfff',
  40: '#99e5ff',
  30: '#b3ecff',
  20: '#ccf2ff',
  10: '#e6f9ff',
}

export const blue = {
  100: '#0A81AB',
  90: '#0779E4',
  80: '#39A2DB',
}

export const gold = {
  100: '#a67c00',
  80: '#bf9b30',
  60: '#ffbf00',
  40: '#ffcf40',
  20: '#ffdc73',
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
  10: '#fbf0e9',
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
  10: '#f3f3f3',
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
  copper: '#db6923',
}

//purplePallet.purpleDeep

export const purple = {
  100: '#1f004c',
  90: '#26005d',
  80: '#2f036f',
  70: '#380b78',
  60: '#400d88',
  50: '#6c30cc',
  40: '#bb4ed9',
  30: '#cf4ab7',
}

export const black = {
  100: '#11111',
  90: '#111111ee',
  80: '#111111ee',
  70: '#111111dd',
  60: '#111111cc',
  50: '#111111aa',
  40: '#11111188',
  30: '#11111166',
  20: '#11111144',
  10: '#11111122',
}

export const pink = {
  100: '#E05297',
  80: '#EA86B6',
  60: '#F3BAD6',
  10: '#FCEEF5',
}

export const pcl = {
  background: '#f7f7f7',
  deep: '#151043',
  purple: '#3c1f6f',
  deepBlue: '#111d72',
  blue: '#023fba',
  lightBlue: '#3997d9',
  gold: '#e1ac2d',
  black: '#000b',
  textPlaceholder: '#0008',
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
  textGray: '#757575',
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    display: 'flex',
    flex: 1,
  },
  linkText: {
    color: skyBlue[90],
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    // flex: 1
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    // flex: 1
  },
  socialButton: {
    borderRadius: 10,
    paddingHorizontal: 30,
    display: 'flex',
    flex: 1,
  },
  stretchedBox: {
    height: '100%',
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export const {
  container: themeContainer,
  linkText,
  flexColumn,
  flexRow,
  socialButton,
  stretchedBox,
  shadow,
} = style
