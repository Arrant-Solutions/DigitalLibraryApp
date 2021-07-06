import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { flexColumn, flexRow } from './style'

interface RadioGroupProps {
  label?: string
  defaultValue: string
  options: string[]
  setSelectedValue: (value: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  defaultValue,
  setSelectedValue
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
    </View>
  )
}

export default RadioGroup

const styles = StyleSheet.create({})
