import React, {useState} from 'react'
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import {CheckBox} from 'react-native-elements'
import {flexColumn, flexRow} from './style'

interface RadioGroupProps {
  title?: string
  titleStyle?: TextStyle
  label?: string
  labelStyle?: TextStyle
  defaultValue: string
  checkedColor?: string
  uncheckedColor?: string
  options: string[]
  setSelectedValue: (value: string) => void
  errorMessage?: string
  errorStyle?: TextStyle
  containerStyle?: ViewStyle
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  titleStyle,
  label,
  labelStyle,
  options,
  checkedColor,
  uncheckedColor,
  defaultValue,
  setSelectedValue,
  errorMessage,
  errorStyle,
  containerStyle,
}) => {
  const [selected, setSelected] = useState(defaultValue)
  return (
    <View style={flexColumn}>
      {label && (
        <Text style={[{paddingHorizontal: 10, color: '#ddd'}, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={flexRow}>
        {options.map(option => (
          <CheckBox
            containerStyle={[
              {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                marginTop: -5,
              },
              containerStyle,
            ]}
            key={option}
            title={option}
            textStyle={[{color: 'white'}, titleStyle]}
            checkedColor={checkedColor || '#eee'}
            uncheckedColor={uncheckedColor || '#eee'}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={option === selected}
            onPress={() => {
              setSelectedValue(option)
              setSelected(option)
            }}
          />
        ))}
      </View>
      {Boolean(errorMessage?.length) && (
        <Text
          style={[
            {
              paddingHorizontal: 7,
              marginTop: -10,
              marginBottom: 10,
              color: 'red',
              marginHorizontal: 12,
            },
            errorStyle,
          ]}>
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

export default RadioGroup

const styles = StyleSheet.create({})
