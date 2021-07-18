// type IconType =
//   | 'ionicon'
//   | 'antdesign'
//   | 'fontisto'
//   | 'materialcommunity'
//   | 'material'

import { IconType } from 'react-native-elements/dist/icons/Icon'

export type IconName =
  | 'anointing'
  | 'campus_ministry'
  | 'children'
  | 'christian_living'
  | 'church_growth'
  | 'evangelism'
  | 'faith'
  | 'finance'
  | 'foundation'
  | 'health'
  | 'holy_spirit'
  | 'leader'
  | 'lifestyle'
  | 'soul_winning'
  | 'teens'
  | 'thanksgiving'
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
  icon: IconName | CategoryIconI
}
