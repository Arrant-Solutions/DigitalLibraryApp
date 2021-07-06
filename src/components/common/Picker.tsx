import React, { useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Input, Overlay } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { flexRow } from './style'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
)

interface PickerProps {
  options: any[]
  setSelected: (value: string) => void
}

const Picker: React.FC<PickerProps> = ({ options, setSelected }) => {
  const [value, setValue] = useState(null)
  const [visible, setVisible] = useState(false)

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const [selectedId, setSelectedId] = useState(null)

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
    const color = item.id === selectedId ? 'white' : 'black'

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  if (!visible) {
    return (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={styles.pickerContainer}>
          <Text style={styles.selected}>Select</Text>
          <Icon name="chevron-down" size={20} color="white" />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Overlay fullScreen isVisible={visible} onBackdropPress={toggleOverlay}>
      <SafeAreaView style={styles.container}>
        <View style={[flexRow, styles.header]}>
          <Icon name="chevron-back" size={30} />
          <Input
            style={{ backgroundColor: 'red' }}
            placeholderTextColor="#ccc"
            // label="Password"
            placeholder="Password"
            rightIcon={<Icon name={'eye-outline'} size={20} color="white" />}
          />
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </Overlay>
  )
}

export default Picker

const styles = StyleSheet.create({
  header: {},
  pickerContainer: {
    borderRadius: 20,
    borderWidth: 1 / 2,
    borderColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
    margin: 7
  },
  selected: {
    color: '#ddd',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    padding: 5
    // marginVertical: 8,
    // marginHorizontal: 16
  },
  title: {
    fontSize: 15
  }
})
