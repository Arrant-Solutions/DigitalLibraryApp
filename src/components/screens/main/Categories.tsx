import React, { useEffect, useState, PureComponent } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Header, Icon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CategoryI, CategoryIconI } from '../../../models/category'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchCategories,
  selectCategories
} from '../../../redux/slices/categoriesSlice'
import { flexRow, purplePallet, stretchedBox } from '../../common/style'

class Item extends PureComponent<Omit<CategoryI, 'categoryID'>> {
  getIcon({ name, size, type, color }: CategoryIconI) {
    color = color || '#000'
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
      case 'material':
      default:
        return <MaterialIcons color={color} name={name} size={size} />
    }
  }
  render() {
    const { name, numberOfItems, icon } = this.props
    return (
      <View style={styles.itemContainer}>
        {this.getIcon(icon)}
        <Text>{`${name} (${numberOfItems})`}</Text>
      </View>
    )
  }
}

const Categories = () => {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { errorMessage, categories } = useAppSelector(selectCategories)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCategories()).finally(() => setLoading(false))
  })

  const keyExtractor = ({ categoryID }: CategoryI, index: number) =>
    String(categoryID)

  const renderItem = ({ item }: { item: CategoryI }) => (
    <Item
      name={item.name}
      numberOfItems={item.numberOfItems}
      icon={item.icon}
    />
  )

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
                Categories
              </Text>
            </View>
          }
          rightComponent={{
            icon: 'ios-ellipsis-vertical-sharp',
            color: '#fff',
            type: 'ionicon'
          }}
        />
        <ScrollView style={styles.container}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={keyExtractor}
            />
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
