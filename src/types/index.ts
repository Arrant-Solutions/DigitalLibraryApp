import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export interface FirebaseQuery<T> {
  name: keyof T
  operator: FirebaseFirestoreTypes.WhereFilterOp
  value: ValueOf<T>
}

export type ValueOf<T> = T[keyof T]

export type FirebaseFieldType =
  | string
  | number
  | FirebaseFirestoreTypes.FieldPath
