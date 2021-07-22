import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  GestureResponderEvent,
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
  back?: boolean
  handleBackButton?: ((event: GestureResponderEvent) => void) | undefined
}

const Header: React.FC<HeaderProps> = ({ title, back, handleBackButton }) => {
  const dispatch = useAppDispatch()
  const { width } = useWindowDimensions()
  const { goBack } = useNavigation()
  const handlePress = (e: GestureResponderEvent) =>
    handleBackButton ? handleBackButton(e) : goBack()

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
            <Icon
              name={back ? 'ios-chevron-back' : 'logo-android'}
              color="#fff"
              onPress={back ? handlePress : undefined}
              type="ionicon"
              size={30}
            />
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
