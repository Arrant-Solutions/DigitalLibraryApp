import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchCategories,
  selectCategories
} from '../../../redux/slices/categoriesSlice'
import { flexRow, purplePallet, stretchedBox } from '../../common/style'

const Categories = () => {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { errorMessage, categories } = useAppSelector(selectCategories)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCategories()).finally(() => setLoading(false))
  })

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
            <View style={styles.grid}>
              {categories.map(({ name, numberOfItems }) => (
                <Text>{name}</Text>
              ))}
            </View>
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
  grid: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})
