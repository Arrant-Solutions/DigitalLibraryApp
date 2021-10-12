import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import {Header as ElementsHeader, Icon} from 'react-native-elements'
import {useAppDispatch, useAppSelector} from 'redux/hooks'
import {setVisible} from 'redux/slices/modalSlice'
import {selectTheme} from 'redux/slices/themeSlice'
import {flexRow, pcl} from './style'

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
  const {
    background,
    text,
    active,
    inactive,
    barStyle: statusBarStyle,
  } = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()
  const {width} = useWindowDimensions()
  const {goBack} = useNavigation()
  const handlePress = (e: GestureResponderEvent) =>
    handleBackButton ? handleBackButton(e) : goBack()

  return (
    <View>
      <ElementsHeader
        containerStyle={containerStyle}
        statusBarProps={{barStyle: barStyle || statusBarStyle}}
        backgroundColor={backgroundColor || background}
        leftComponent={
          <View
            style={[flexRow, {flex: 1, width: width * .8, alignItems: 'center'}]}>
            {back ? (
              <Icon
                name={'ios-chevron-back'}
                color={color || text}
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
              numberOfLines={1}
              style={{
                marginLeft: 10,
                color: color || text,
                fontSize: 20,
                flex: 1,
                textTransform: 'capitalize'
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
                color={color || pcl.black}
                type="ionicon"
                // onPress={() => dispatch(setVisible(true))}
              />
              <Icon
                name="ios-ellipsis-vertical-sharp"
                color={color || pcl.black}
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
