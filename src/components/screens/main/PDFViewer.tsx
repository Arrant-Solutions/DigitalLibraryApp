import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import PDF from 'react-native-pdf'
import Slider from '@react-native-community/slider'
import React, {useEffect, useState} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {ResourceItemT} from 'types/Resource'

type ParamList = {
  PDFViewer: {
    resource: ResourceItemT
  }
}

const PDFViewer = () => {
  const {params} = useRoute<RouteProp<ParamList, 'PDFViewer'>>()
  const [resource] = useState(params?.resource)
  const [scale, setScale] = useState(1)
  // console.log(params, resource)

  //   useEffect(() => {
  //     addListener('beforeRemove', e => {
  //       console.log('no nav')
  //       e.preventDefault()
  //     })
  //   }, [])

  return (
    <View style={styles.container}>
      <PDF
        scale={scale}
        source={{uri: resource?.resource_url}}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`)
        }}
        onError={error => {
          console.log(error)
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`)
        }}
        fitPolicy={1}
        style={styles.pdf}
      />
      <View style={styles.controls}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  )
}

export default PDFViewer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
})
