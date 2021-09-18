import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  GestureResponderEvent,
  Image,
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
  showActionButtons?: boolean
  handleBackButton?: ((event: GestureResponderEvent) => void) | undefined
}

const Header: React.FC<HeaderProps> = ({
  containerStyle,
  barStyle,
  backgroundColor,
  color,
  title,
  back,
  showActionButtons = true,
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
        statusBarProps={{barStyle: barStyle || 'light-content'}}
        backgroundColor={backgroundColor || pcl.purple}
        leftComponent={
          <View style={[flexRow, {width, alignItems: 'center'}]}>
            {back ? (
              <Icon
                name={'ios-chevron-back'}
                color={color || pcl.background}
                onPress={back ? handlePress : undefined}
                type="ionicon"
                size={30}
              />
            ) : (
              <Image
                style={{height: 30, width: 30, borderRadius: 7}}
                source={require('/assets/logo.jpg')}
              />
            )}
            <Text
              style={{
                marginLeft: 10,
                color: color || pcl.background,
                fontSize: 20,
              }}>
              {title}
            </Text>
          </View>
        }
        rightComponent={
          showActionButtons ? (
            <View style={flexRow}>
              <Icon
                containerStyle={{marginRight: 10}}
                name="search"
                color={color || pcl.background}
                type="ionicon"
                // onPress={() => dispatch(setVisible(true))}
              />
              <Icon
                name="ios-ellipsis-vertical-sharp"
                color={color || pcl.background}
                type="ionicon"
                onPress={() => dispatch(setVisible(true))}
              />
            </View>
          ) : (
            <></>
          )
        }
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
