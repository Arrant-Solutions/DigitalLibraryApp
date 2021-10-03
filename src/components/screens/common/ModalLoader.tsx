import React from 'react'
import {Modal, StyleSheet, Text, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import {pcl} from './style'

interface ModalLoaderProps {
  visible: boolean
  transparent?: boolean
}

const ModalLoader: React.FC<ModalLoaderProps> = ({visible, transparent}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={transparent} visible={visible}>
        <View style={[styles.content]}>
          <ActivityIndicator size="large" color={pcl.lightBlue} />
        </View>
      </Modal>
    </View>
  )
}

export default ModalLoader

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff9',
  },
})
