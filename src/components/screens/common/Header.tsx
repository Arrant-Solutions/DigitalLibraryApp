import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  GestureResponderEvent,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import {Header as ElementsHeader, Icon} from 'react-native-elements'
import {useAppDispatch} from 'redux/hooks'
import {setVisible} from 'redux/slices/modalSlice'
import {flexRow, pcl, purple, purplePallet} from './style'

interface HeaderProps {
  containerStyle?: ViewStyle
  barStyle?: 'light-content' | 'light-content'
  backgroundColor?: string
  color?: string
  title: string
  back?: boolean
  handleBackButton?: ((event: GestureResponderEvent) => void) | undefined
}

const Header: React.FC<HeaderProps> = ({
  containerStyle,
  barStyle,
  backgroundColor,
  color,
  title,
  back,
  handleBackButton,
}) => {
  const dispatch = useAppDispatch()
  const {width} = useWindowDimensions()
  const {goBack} = useNavigation()
  const handlePress = (e: GestureResponderEvent) =>
    handleBackButton ? handleBackButton(e) : goBack()

  return (
    <View>
      <ElementsHeader
        containerStyle={containerStyle}
        statusBarProps={{barStyle: barStyle || 'dark-content'}}
        backgroundColor={backgroundColor || pcl.gold}
        leftComponent={
          <View style={[flexRow, {width, alignItems: 'center'}]}>
            <Icon
              name={back ? 'ios-chevron-back' : 'logo-android'}
              color={color || pcl.deepBlue}
              onPress={back ? handlePress : undefined}
              type="ionicon"
              size={30}
            />
            <Text
              style={{
                marginLeft: 10,
                color: color || pcl.deepBlue,
                fontSize: 20,
              }}>
              {title}
            </Text>
          </View>
        }
        rightComponent={
          <View style={flexRow}>
            <Icon
              containerStyle={{marginRight: 10}}
              name="search"
              color={color || pcl.deepBlue}
              type="ionicon"
              // onPress={() => dispatch(setVisible(true))}
            />
            <Icon
              name="ios-ellipsis-vertical-sharp"
              color={color || pcl.deepBlue}
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
