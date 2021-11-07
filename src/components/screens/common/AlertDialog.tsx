import React, {useEffect, useState} from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import {useAppDispatch, useAppSelector} from 'redux/hooks'
import {clearAlert, selectAlert} from 'redux/slices/alertSlice'
import {pcl} from './style'

export const AlertDialog = () => {
  const {message, title, buttons, cancelable} = useAppSelector(selectAlert)
  const dispatch = useAppDispatch()
  const [showCancel, setShowCancel] = useState(
    Boolean(buttons && buttons.length > 1),
  )

  useEffect(() => {
    setShowCancel(Boolean(buttons && buttons.length > 1))
  }, [buttons])

  return (
    <AwesomeAlert
      show={Boolean(title && message)}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={cancelable}
      closeOnHardwareBackPress={cancelable}
      showCancelButton={showCancel}
      showConfirmButton={true}
      cancelText={showCancel && buttons ? buttons.at(0)?.text : ''}
      confirmText={
        !buttons
          ? 'Close'
          : buttons.length === 1
          ? buttons[0].text || 'Close'
          : buttons[1].text
      }
      onDismiss={() => dispatch(clearAlert())}
      confirmButtonColor={pcl.gold}
      confirmButtonTextStyle={{color: pcl.textPlaceholder, fontWeight: 'bold'}}
      onCancelPressed={() => {
        buttons &&
          buttons.length > 1 &&
          typeof buttons[0]?.onPress === 'function' &&
          buttons[0].onPress()
        dispatch(clearAlert())
      }}
      onConfirmPressed={() => {
        if (buttons) {
          if (
            buttons.length === 1 &&
            typeof buttons[0]?.onPress === 'function'
          ) {
            buttons[0].onPress()
          } else if (typeof buttons[1]?.onPress === 'function') {
            buttons[1].onPress()
          }
        }
        dispatch(clearAlert())
      }}
    />
  )
}

export default AlertDialog
