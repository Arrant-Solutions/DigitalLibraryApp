import React, { useEffect, useState, PureComponent } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Header, Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CategoryI, CategoryIconI } from '../../../models/category'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchCategories,
  selectCategories
} from '../../../redux/slices/categoriesSlice'
import { flexRow, greys, purplePallet, stretchedBox } from '../../common/style'

interface ItemProps {
  style?: ViewStyle
  divider?: boolean
  dividerColor?: string
}

class Item extends PureComponent<Omit<CategoryI, 'categoryID'> & ItemProps> {
  getIcon({ name, size, type, color }: CategoryIconI) {
    color = color || greys[40]
    switch (type) {
      case 'material-community':
        return <MaterialCommunityIcons color={color} name={name} size={size} />
      // case 'simple-line-icon':
      //   break
      // case 'zocial':
      //   break
      // case 'font-awesome':
      //   break
      // case 'octicon':
      //   break
      case 'ionicon':
        return <Ionicons color={color} name={name} size={size} />
      // case 'foundation':
      //   break
      // case 'evilicon':
      //   break
      // case 'entypo':
      //   break
      // case 'antdesign':
      //   break
      // case 'font-awesome-5':
      //   break
      case 'material-community':
      default:
        return <MaterialCommunityIcons color={color} name={name} size={size} />
    }
  }
  render() {
    const { name, numberOfItems, icon, style } = this.props
    return (
      <View style={[styles.itemContainer, style]}>
        {this.getIcon(icon)}
        <Text style={styles.itemText}>{`${name} (${numberOfItems})`}</Text>
      </View>
    )
  }
}

const Library = () => {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { errorMessage, categories } = useAppSelector(selectCategories)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCategories()).finally(() => setLoading(false))
  }, [])

  const keyExtractor = ({ categoryID }: CategoryI, index: number) =>
    String(categoryID)

  const renderItem = ({ item, index }: { item: CategoryI; index: number }) => {
    return (
      <Item
        style={
          (index + 1) % 2 === 1
            ? { borderRightWidth: 1 / 3, borderRightColor: '#fff' }
            : undefined
        }
        name={item.name}
        numberOfItems={item.numberOfItems}
        icon={item.icon}
      />
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#fff',
        height: 1 / 3
      }}
    />
  )

  console.log(categories)

  return (
    <SafeAreaView>
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
        style={stretchedBox}>
        <StatusBar backgroundColor={purplePallet.purpleDeep} />
        <Header
          backgroundColor={purplePallet.purpleDeep}
          leftComponent={
            <View style={[flexRow, { width, alignItems: 'center' }]}>
              <Icon name="logo-android" color="#fff" type="ionicon" size={20} />
              <Text style={{ marginLeft: 10, color: '#fff', fontSize: 20 }}>
                Library
              </Text>
            </View>
          }
          rightComponent={{
            icon: 'ios-ellipsis-vertical-sharp',
            color: '#fff',
            type: 'ionicon'
          }}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={categories}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={keyExtractor}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Library

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  itemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 20,
    paddingTop: 10
  },
  itemText: {
    textAlign: 'center',
    color: greys[30],
    fontSize: 15,
    fontWeight: 'bold'
  }
})
