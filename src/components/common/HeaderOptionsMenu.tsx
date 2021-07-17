import React from 'react'
import { Platform } from 'react-native'
import { Pressable, StatusBar } from 'react-native'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Header, Icon, ListItem } from 'react-native-elements'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectModal, setVisible } from '../../redux/slices/modalSlice'
import { purplePallet } from './style'

const HeaderOptionsMenu = () => {
  const { visible } = useAppSelector(selectModal)
  const dispatch = useAppDispatch()
  console.log(StatusBar.currentHeight)
  return (
    <View style={styles.topRightView}>
      <StatusBar />
      <Header />
      <Modal transparent={true} visible={visible}>
        <Pressable
          style={{
            flex: 1,
            display: 'flex',
            backgroundColor: '#9cf4',
            alignItems: 'flex-end'
          }}
          onPress={() => {
            setTimeout(() => {
              dispatch(setVisible(false))
            }, 5)
          }}>
          <View style={styles.modalView}>
            <ListItem
              bottomDivider
              onPress={() => {
                console.log('pressed')
                setTimeout(() => {
                  dispatch(setVisible(false))
                }, 5)
              }}>
              <Icon type="ionicon" name="home" />
              <ListItem.Content>
                <ListItem.Title>Item One</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem
              bottomDivider
              onPress={() => {
                console.log('pressed')
                setTimeout(() => {
                  dispatch(setVisible(false))
                }, 5)
              }}>
              <Icon type="ionicon" name="home" />
              <ListItem.Content>
                <ListItem.Title>Item Two</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem
              bottomDivider
              onPress={() => {
                console.log('pressed')
                setTimeout(() => {
                  dispatch(setVisible(false))
                }, 5)
              }}>
              <Icon type="ionicon" name="home" />
              <ListItem.Content>
                <ListItem.Title>Item Three</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default HeaderOptionsMenu

const styles = StyleSheet.create({
  topRightView: {
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1
  },
  modalView: {
    margin: Platform.OS === 'android' ? 5 : 0,
    marginTop: StatusBar.currentHeight || 92,
    width: 200,
    // height: 300,
    backgroundColor: 'white',
    borderWidth: 1 / 3,
    borderColor: `${purplePallet.purpleDeep}55`,
    // padding: 10,
    borderRadius: Platform.OS === 'android' ? 5 : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
