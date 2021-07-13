// type IconType =
//   | 'ionicon'
//   | 'antdesign'
//   | 'fontisto'
//   | 'materialcommunity'
//   | 'material'

import { IconType } from 'react-native-elements/dist/icons/Icon'

export interface CategoryIconI {
  name: string
  type: IconType
  size?: number
  color?: string
}

export interface CategoryI {
  categoryID: number
  name: string
  numberOfItems: number
  icon: CategoryIconI
}
