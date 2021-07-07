import React, { useState } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { flexColumn, flexRow } from './style'

interface RadioGroupProps {
  label?: string
  defaultValue: string
  options: string[]
  setSelectedValue: (value: string) => void
  errorMessage?: string
  errorStyle?: TextStyle
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  defaultValue,
  setSelectedValue,
  errorMessage,
  errorStyle
}) => {
  const [selected, setSelected] = useState(defaultValue)
  return (
    <View style={flexColumn}>
      {label && (
        <Text style={{ paddingHorizontal: 10, color: '#ddd' }}>{label}</Text>
      )}
      <View style={flexRow}>
        {options.map(option => (
          <CheckBox
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              marginTop: -5
            }}
            key={option}
            title={option}
            textStyle={{ color: 'white' }}
            checkedColor="#eee"
            uncheckedColor="#eee"
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
              marginHorizontal: 12
            },
            errorStyle
          ]}>
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

export default RadioGroup

const styles = StyleSheet.create({})
