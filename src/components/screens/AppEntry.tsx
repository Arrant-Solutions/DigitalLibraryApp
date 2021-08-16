import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectAuth, restoreSession } from '../../redux/slices/authSlice'
import AuthStack from '../navigation/AuthStack'
import HomeStack from '../navigation/HomeStack'
import Splash from './Splash'

const AppEntry = () => {
  const [resolved, setResolved] = useState(false)
  const { token } = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(restoreSession()).finally(() => setResolved(true))
  }, [])

  if (!resolved) {
    return <Splash />
  }

  if (typeof token === 'string' && token.length > 20) {
    return <HomeStack />
  }

  console.log('here thus far')
  return <AuthStack />
}

export default AppEntry

const styles = StyleSheet.create({})
