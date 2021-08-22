import React, { useCallback, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { Input, Overlay } from 'react-native-elements'
import uuid from 'react-native-uuid'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { flexRow, purplePallet, themeContainer } from './style'
import index from '../screens/main'

interface ItemProps {
  item: string
  onPress: () => void
  backgroundColor: { backgroundColor: string }
  textColor: { color: string }
}

class Item extends React.PureComponent<ItemProps> {
  render() {
    const { item, onPress, backgroundColor, textColor } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.title, textColor]}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  }
}

interface PickerProps {
  options: string[]
  setSelected: (value: string) => void
  errorMessage?: string
  errorStyle?: TextStyle
}

const Picker: React.FC<PickerProps> = ({
  setSelected,
  options,
  errorMessage,
  errorStyle
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>()
  const [searchTerm, setSearchTerm] = useState('')
  const [itemHeight] = useState(50)
  const [hasError] = useState(Boolean(errorMessage?.length))
  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index
    }),
    []
  )
  const keyExtractor = useCallback(item => item, [])

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const renderItem = ({ item }: { item: string }) => {
    const backgroundColor = item === selectedItem ? '#6e3b6e' : '#fff'
    const color = item === selectedItem ? 'white' : 'black'

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedItem(item)
          setSelected(item)
          setVisible(false)
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  if (!visible) {
    return (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View
          style={
            hasError
              ? [styles.pickerContainer, { borderColor: 'red' }]
              : styles.pickerContainer
          }>
          <Text style={styles.selected}>{selectedItem || 'Select'}</Text>
          <Icon name="chevron-down" size={20} color="white" />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Overlay
      overlayStyle={{ backgroundColor: purplePallet.purpleDarker }}
      fullScreen
      isVisible={visible}
      onBackdropPress={toggleOverlay}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[
            purplePallet.purpleDarker,
            purplePallet.purpleDarker,
            purplePallet.purpleLight
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={110}
          style={themeContainer}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              backgroundColor: 'white',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10
            }}>
            <View style={[flexRow, styles.header]}>
              <Icon
                style={{ padding: 0 }}
                onPress={() => setVisible(false)}
                name="chevron-back"
                size={40}
                color="white"
              />
              <Input
                value={searchTerm}
                onChangeText={value => setSearchTerm(value.trim())}
                inputContainerStyle={{
                  margin: 0,
                  borderWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: 'white',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 7,
                  marginRight: 5
                }}
                containerStyle={{
                  padding: 0,
                  paddingRight: 40,
                  borderWidth: 0,
                  height: 50
                }}
                placeholderTextColor="#ccc"
                // label="Password"
                placeholder="Search"
                rightIcon={<Icon name="search" size={20} color="black" />}
              />
            </View>

            <FlatList
              data={
                searchTerm.length > 0
                  ? options.filter(item =>
                      new RegExp(searchTerm, 'ig').test(item)
                    )
                  : options
              }
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              extraData={selectedItem}
              getItemLayout={getItemLayout}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Overlay>
  )
}

export default Picker

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: purplePallet.purpleDarker
  },
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
    backgroundColor: purplePallet.purpleDarker,
    // marginTop: StatusBar.currentHeight || 0
  },
  item: {
    padding: 10,
    borderBottomWidth: 1 / 3
  },
  title: {
    fontSize: 15
  }
})
