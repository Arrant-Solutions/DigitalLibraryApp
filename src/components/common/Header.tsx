import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'
import { Header as ElementsHeader, Icon } from 'react-native-elements'
import { useAppDispatch } from '../../redux/hooks'
import { setVisible } from '../../redux/slices/modalSlice'
import { flexRow, purplePallet } from './style'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch()
  const { width } = useWindowDimensions()

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={purplePallet.purpleDeep}
      />
      <ElementsHeader
        backgroundColor={purplePallet.purpleDeep}
        leftComponent={
          <View style={[flexRow, { width, alignItems: 'center' }]}>
            <Icon name="logo-android" color="#fff" type="ionicon" size={20} />
            <Text style={{ marginLeft: 10, color: '#fff', fontSize: 20 }}>
              {title}
            </Text>
          </View>
        }
        rightComponent={
          <View style={flexRow}>
            <Icon
              containerStyle={{ marginRight: 10 }}
              name="search"
              color="#fff"
              type="ionicon"
              // onPress={() => dispatch(setVisible(true))}
            />
            <Icon
              name="ios-ellipsis-vertical-sharp"
              color="#fff"
              type="ionicon"
              onPress={() => dispatch(setVisible(true))}
            />
          </View>
        }
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
