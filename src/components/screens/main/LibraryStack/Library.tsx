import React, { useEffect, useState, PureComponent } from 'react'
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CategoryI, CategoryIconI, IconName } from '../../../../models/category'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  fetchCategories,
  selectCategories
} from '../../../../redux/slices/categoriesSlice'
import {
  greys,
  purplePallet,
  stretchedBox,
  themeBlack
} from '../../../common/style'
import Header from '../../../common/Header'
import Anointing from '../../../../../assets/images/anointing.svg'
import CampusMinistries from '../../../../../assets/images/campus_ministries.svg'
import Children from '../../../../../assets/images/children.svg'
import ChristianLiving from '../../../../../assets/images/christian_living.svg'
import Classics from '../../../../../assets/images/classics.svg'
import Evangelism from '../../../../../assets/images/evangelism.svg'
import Faith from '../../../../../assets/images/faith.svg'
import Finance from '../../../../../assets/images/finance.svg'
import FoundationSchool from '../../../../../assets/images/foundation.svg'
import Freebies from '../../../../../assets/images/freebies.svg'
import GospelWorld from '../../../../../assets/images/gospel_world.svg'
import Health from '../../../../../assets/images/health.svg'
import HolySpirit from '../../../../../assets/images/holy_spirit.svg'
import Leader from '../../../../../assets/images/leader.svg'
import Lifestyle from '../../../../../assets/images/lifestyle.svg'
import QuestionAndAnswer from '../../../../../assets/images/question_and_answer.svg'
import SoulWinning from '../../../../../assets/images/soul_winning.svg'
import Teens from '../../../../../assets/images/teens.svg'
import Thanksgiving from '../../../../../assets/images/thanksgiving.svg'
import { useNavigation } from '@react-navigation/native'
import { CATEGORY } from '../../../../constants/screens'

interface ItemProps {
  style?: ViewStyle
  divider?: boolean
  dividerColor?: string
}

class Item extends PureComponent<Omit<CategoryI, 'categoryID'> & ItemProps> {
  getIcon(icon: CategoryIconI | IconName) {
    if (typeof icon === 'string') {
      let iconColor = `${themeBlack}cc`
      switch (icon) {
        case 'anointing':
          return <Anointing width={70} height={70} color={iconColor} />
        case 'campus_ministry':
          return <CampusMinistries width={70} height={70} color={iconColor} />
        case 'children':
          return <Children width={70} height={70} color={iconColor} />
        case 'christian_living':
          return <ChristianLiving width={70} height={70} color={iconColor} />
        case 'classics':
          return <Classics width={70} height={70} color={iconColor} />
        case 'evangelism':
          return <Evangelism width={70} height={70} color={iconColor} />
        case 'faith':
          return <Faith width={70} height={70} color={iconColor} />
        case 'finance':
          return <Finance width={70} height={70} color={iconColor} />
        case 'foundation':
          return <FoundationSchool width={70} height={70} color={iconColor} />
        case 'freebies':
          return <Freebies width={70} height={70} color={iconColor} />
        case 'health':
          return <Health width={70} height={70} color={iconColor} />
        case 'holy_spirit':
          return <HolySpirit width={70} height={70} color={iconColor} />
        case 'gospel_world':
          return <GospelWorld width={70} height={70} color={iconColor} />
        case 'leader':
          return <Leader width={70} height={70} color={iconColor} />
        case 'lifestyle':
          return <Lifestyle width={70} height={70} color={iconColor} />
        case 'question_and_answer':
          return <QuestionAndAnswer width={70} height={70} color={iconColor} />
        case 'soul_winning':
          return <SoulWinning width={70} height={70} color={iconColor} />
        case 'teens':
          return <Teens width={70} height={70} color={iconColor} />
        case 'thanksgiving':
        default:
          return <Thanksgiving width={70} height={70} color={iconColor} />
      }
    }

    let { name, size, type, color } = icon
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
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { errorMessage, categories } = useAppSelector(selectCategories)
  const { navigate } = useNavigation()

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCategories()).finally(() => setLoading(false))
  }, [])

  const keyExtractor = ({ categoryID }: CategoryI) => String(categoryID)

  const renderItem = ({ item, index }: { item: CategoryI; index: number }) => {
    return (
      <Pressable
        style={{ display: 'flex', flex: 1 }}
        onPress={() =>
          navigate(CATEGORY, { id: item.categoryID, name: item.name })
        }>
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
      </Pressable>
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
        <Header title="Library" />
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
    marginTop: 10,
    textAlign: 'center',
    color: greys[50],
    fontSize: 15,
    fontWeight: 'bold'
  }
})
