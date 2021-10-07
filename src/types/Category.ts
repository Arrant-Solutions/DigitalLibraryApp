// type IconType =
//   | 'ionicon'
//   | 'antdesign'
//   | 'fontisto'
//   | 'materialcommunity'
//   | 'material'

import {ViewStyle} from 'react-native'
import {IconType} from 'react-native-elements/dist/icons/Icon'

export type IconName = 'eBook' | 'Video' | 'Audio' | 'Downloaded' | 'Playlist'

export interface CategoryIconI {
  name: string
  type: IconType
  size?: number
  color?: string
}

export interface CategoryI {
  category_id: number
  name: string
  numberOfItems: number
  icon: IconName | CategoryIconI
}
