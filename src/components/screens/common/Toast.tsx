/** Using this guy until material ui Toast reaches a stable state */
import React from 'react'
import {ColorValue, StyleSheet, Text, View, ViewStyle} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const classes = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 16,
    letterSpacing: 0.17136,
    lineHeight: 1.43,
    borderRadius: 4,
    fontWeight: '400',
    alignItems: 'center',
    bottom: 30,
    marginBottom: 10,
  },
})

export interface ToastType {
  error: string
  warning: string
  info: string
  success: string
  'error-outline': string
  'success-outline': string
  'info-outline': string
}

interface ToastI {
  message: string
  type: keyof ToastType
  style?: ViewStyle
}

interface ToastTypeI {
  borderWidth: number
  borderColor: ColorValue
  borderStyle: 'solid' | 'dotted' | 'dashed'
  icon: JSX.Element
  color: ColorValue
  backgroundColor: ColorValue
}

const styles: Record<keyof ToastType, ToastTypeI & ViewStyle> = {
  error: {
    color: '#ffebea',
    backgroundColor: '#2b1313',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fff0',
    icon: (
      <MaterialIcons
        size={20}
        color="#dc3b30"
        name="error-outline"
        style={{marginRight: 10}}
      />
    ),
  },
  'error-outline': {
    color: '#a20b00',
    backgroundColor: '#ffebea',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#f9a59f',
    icon: (
      <MaterialIcons
        size={20}
        color="#dc3b30"
        name="error-outline"
        style={{marginRight: 10}}
      />
    ),
  },
  warning: {
    color: '#fab3ae',
    backgroundColor: '#180605',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fff0',
    icon: (
      <AntDesign
        size={20}
        color="#dc3b30"
        name="warning"
        style={{marginRight: 10}}
      />
    ),
  },
  info: {
    color: '#a6d5fa',
    backgroundColor: '#030e18',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fff0',
    icon: (
      <MaterialIcons
        size={20}
        name="info-outline"
        color="#2196f3"
        style={{marginRight: 10}}
      />
    ),
  },
  'info-outline': {
    color: '#030e18',
    backgroundColor: '#a6d5fa90',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#2196f3',
    icon: (
      <MaterialIcons
        size={20}
        name="info-outline"
        color="#2196f3"
        style={{marginRight: 10}}
      />
    ),
  },
  success: {
    color: '#b7dfb9',
    backgroundColor: '#071107',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fff0',
    icon: (
      <MaterialIcons
        size={20}
        name="check-circle-outline"
        color="#4caf50"
        style={{marginRight: 10}}
      />
    ),
  },
  'success-outline': {
    color: '#1c8622',
    backgroundColor: '#22a2221a',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#4caf50',
    icon: (
      <MaterialIcons
        size={20}
        name="check-circle-outline"
        color="#4caf50"
        style={{marginRight: 10}}
      />
    ),
  },
}

export const Toast = ({message, type, style}: ToastI) => {
  const item = styles[type]
  const {icon, borderWidth, borderColor, borderStyle, color, backgroundColor} =
    item

  return (
    <View
      style={[
        {
          ...classes.root,
          borderWidth,
          borderColor,
          borderStyle,
          // color,
          backgroundColor,
          // width: '95%',
          marginHorizontal: 5,
        },
        style,
      ]}>
      {icon}
      <Text numberOfLines={2} style={{color, fontSize: 10}}>
        {message}
      </Text>
    </View>
  )
}
