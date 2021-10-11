import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Pdf from 'react-native-pdf'
import Slider from '@react-native-community/slider'
import React, {useRef, useState} from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {ResourceItemT} from 'types/Resource'
import {pcl} from '../common/style'
import {Divider} from 'react-native-elements'
import Header from '../common/Header'

type ParamList = {
  PDFViewer: {
    resource: ResourceItemT
  }
}

const PDFViewer = () => {
  const {params} = useRoute<RouteProp<ParamList, 'PDFViewer'>>()
  const [resource] = useState(params?.resource)
  const pdf = useRef<Pdf | null>(null)
  let hideTimeout: NodeJS.Timeout | undefined = undefined
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        triggerShowAndHide()
        return false
      },
    }),
  ).current
  const [state, setState] = useState({
    scale: 1,
    currentPage: 1,
    totalPages: 0,
    bookMode: true,
    animatedControl: new Animated.Value(0),
  })

  //   const interpolatedSlider = animated.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, 32],
  //   })

  //   const sliderStyle = {height: interpolatedSlider}

  //   const toggleWidth = () => {
  //     Animated.timing(animated, {
  //       toValue: bookMode ? 1 : 0,
  //       duration: 200,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }).start()
  //   }

  const {scale, currentPage, totalPages, bookMode, animatedControl} = state

  const interpolatedControls = state.animatedControl.interpolate({
    inputRange: [0, 1],
    outputRange: [50, -5],
  })

  const controlHideStyle = {
    transform: [
      {
        translateY: interpolatedControls,
      },
    ],
  }

  const interpolatedHeaderControl = state.animatedControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 75],
  })

  const headerControlHideStyle = {
    transform: [
      {
        translateY: interpolatedHeaderControl,
      },
    ],
  }

  const triggerShowAndHide = () => {
    console.log('showing')
    hideTimeout && clearTimeout(hideTimeout)

    Animated.timing(animatedControl, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    hideTimeout = setTimeout(() => {
      console.log('hidding')
      Animated.timing(animatedControl, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, 1500)
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Pdf
        ref={pdf}
        scale={scale}
        source={{uri: resource?.resource_url, cache: true}}
        activityIndicatorProps={{height: 30}}
        // page={currentPage}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`)
          setState({...state, totalPages: numberOfPages})
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`)
          setState({...state, currentPage: page})
        }}
        onError={error => {
          console.log(error)
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`)
        }}
        fitPolicy={0}
        style={styles.pdf}
      />
      <Animated.View
        style={[styles.controls, {top: -75}, headerControlHideStyle]}>
        <Header
          title={resource?.title}
          back
          backgroundColor={pcl.background}
          showActionButtons={false}
        />
      </Animated.View>
      {totalPages > 0 && (
        <Animated.View
          style={[
            styles.controls,
            {
              bottom: -9,
              borderTopWidth: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: '#e1e1e1',
            },
            controlHideStyle,
          ]}>
          <View style={styles.pagination}>
            {bookMode ? (
              <>
                <Slider
                  tapToSeek={true}
                  style={{width: '100%', height: 32}}
                  minimumValue={1}
                  maximumValue={totalPages}
                  step={1}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#B2BEB5"
                  thumbImage={require('assets/slider.png')}
                  value={currentPage}
                  onSlidingComplete={value => pdf?.current?.setPage(value)}
                />
                <Text
                  style={styles.pages}>{`${currentPage} / ${totalPages}`}</Text>
              </>
            ) : (
              <Slider
                tapToSeek={true}
                style={{width: '100%', height: 32}}
                minimumValue={1}
                maximumValue={3}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#B2BEB5"
                thumbImage={require('assets/slider.png')}
                value={scale}
                onSlidingComplete={value => setState({...state, scale: value})}
              />
            )}
          </View>
          <Divider orientation="vertical" style={{marginHorizontal: 5}} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {bookMode ? (
              <Fontisto
                style={{padding: 5}}
                name="zoom-plus"
                size={30}
                color={pcl.textPlaceholder}
                onPress={() => {
                  setState({...state, bookMode: false})
                }}
              />
            ) : (
              <Entypo
                style={{padding: 5}}
                name="open-book"
                size={30}
                color={pcl.textPlaceholder}
                onPress={() => {
                  setState({...state, bookMode: true})
                }}
              />
            )}
          </View>
        </Animated.View>
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
    zIndex: 999,
    borderTopWidth: 0.5,
    borderTopColor: '#e1e1e1',
    backgroundColor: pcl.background,
  },
  pagination: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  pages: {
    fontFamily: 'Roboto-Regular',
    color: '#000',
    fontSize: 15,
    marginVertical: 4,
  },
  topControl: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})
