import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

interface MediaPlayerOptionsMenuProps {
    item: string
    visible: boolean
}

const MediaPlayerOptionsMenu: React.FC<MediaPlayerOptionsMenuProps> = () => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={true}></Modal>
    </View>
  )
}

export default MediaPlayerOptionsMenu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-end'
    }
})
