import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import Pdf from 'react-native-pdf'
import Slider from '@react-native-community/slider'
import React, {useEffect, useRef, useState} from 'react'
import {Dimensions, StyleSheet, Text, View} from 'react-native'
import {ResourceItemT} from 'types/Resource'
import {pcl} from '../common/style'

type ParamList = {
  PDFViewer: {
    resource: ResourceItemT
  }
}

const PDFViewer = () => {
  const {params} = useRoute<RouteProp<ParamList, 'PDFViewer'>>()
  const [resource] = useState(params?.resource)
  const [scale, setScale] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pdf = useRef<Pdf | null>(null)
  // console.log(params, resource)

  //   useEffect(() => {
  //     addListener('beforeRemove', e => {
  //       console.log('no nav')
  //       e.preventDefault()
  //     })
  //   }, [])

  return (
    <View style={styles.container}>
      <Pdf
        ref={pdf}
        scale={scale}
        source={{uri: resource?.resource_url}}
        // page={currentPage}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`)
          setTotalPages(numberOfPages)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`)
          setCurrentPage(page)
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
      {totalPages > 0 && (
        <View style={styles.controls}>
          <View style={styles.pagination}>
            <Slider
              tapToSeek={true}
              style={{width: '100%', height: 40}}
              minimumValue={1}
              maximumValue={totalPages}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={currentPage}
              onSlidingComplete={value => {
                console.log(`sliding done: ${value}`)
                //   setCurrentPage(value)
                pdf?.current?.setPage(value)
                return
              }}
              onValueChange={value => console.log(`changed to: ${value}`)}
            />
            <Text style={styles.pages}>{`${currentPage} / ${totalPages}`}</Text>
          </View>
        </View>
      )}
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
  pagination: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pages: {
    fontFamily: 'Roboto-Regular',
    color: pcl.background,
    fontSize: 17,
    marginTop: 10,
  },
})
