import React from 'react'
import {View, StatusBar, StatusBarStyle} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {pcl, statusBar} from './style'

export interface PCLStatusBarProps {
  backgroundColor?: string
  barStyle?: StatusBarStyle | null | undefined
}

const PCLStatusBar: React.FC<PCLStatusBarProps> = ({
  backgroundColor,
  barStyle,
}) => {
  return (
    <View style={[statusBar, {backgroundColor: backgroundColor || pcl.gold}]}>
      <SafeAreaView>
        <StatusBar
          translucent
          barStyle={barStyle}
          backgroundColor={backgroundColor || pcl.gold}
        />
      </SafeAreaView>
    </View>
  )
}

export default PCLStatusBar
