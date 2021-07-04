import { configureFonts, DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
  // fonts: configureFonts({
  //   ios: {
  //     regular: {
  //       fontFamily: 'roboto-regular',
  //       fontWeight: 'normal'
  //     },
  //     medium: {
  //       fontFamily: 'robto-medium',
  //       fontWeight: 'normal'
  //     },
  //     light: {
  //       fontFamily: 'robto-light',
  //       fontWeight: 'normal'
  //     },
  //     thin: {
  //       fontFamily: 'robto-thin',
  //       fontWeight: 'normal'
  //     }
  //   },
  //   android: {
  //     regular: {
  //       fontFamily: 'robto-regular',
  //       fontWeight: 'normal'
  //     },
  //     medium: {
  //       fontFamily: 'robto-medium',
  //       fontWeight: 'normal'
  //     },
  //     light: {
  //       fontFamily: 'robto-light',
  //       fontWeight: 'normal'
  //     },
  //     thin: {
  //       fontFamily: 'robto-thin',
  //       fontWeight: 'normal'
  //     }
  //   }
  // })
}
