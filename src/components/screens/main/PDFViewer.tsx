import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import PDF from 'react-native-pdf'
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
  const {addListener} = useNavigation()
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
})
