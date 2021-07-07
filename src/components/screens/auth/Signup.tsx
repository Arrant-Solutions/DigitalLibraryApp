import { PayloadAction } from '@reduxjs/toolkit'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, SearchBar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { SignupUserI } from '../../../models/user'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  fetchCountries,
  fetchGenders,
  ResourceSliceI,
  restoreResources,
  selectResources
} from '../../../redux/slices/resourceSlice'
import GlassyCard from '../../common/GlassyCard'
import Picker from '../../common/Picker'
import RadioGroup from '../../common/RadioGroup'
import { flexColumn, flexRow, purplePallet } from '../../common/style'

interface SignupProps {}

type ThunkRespone = PayloadAction<
  ResourceSliceI,
  string,
  { arg: void; requestId: string; requestStatus: 'fulfilled' },
  never
>
const Signup: React.FC<SignupProps> = () => {
  const dispatch = useAppDispatch()
  const { countries, genders, errorMessage } = useAppSelector(selectResources)

  useEffect(() => {
    dispatch(restoreResources()).then(({ payload }) => {
      console.log(payload)
      const { genders, countries } = payload as ResourceSliceI

      if (genders.length === 0) {
        dispatch(fetchGenders())
      }

      if (countries.length === 0) {
        dispatch(fetchCountries())
      }
    })
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const initialValues: SignupUserI & { isMember: boolean } = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: genders.find(({ genderName }) => genderName === 'Female') || {
      genderID: 0,
      genderName: 'male'
    },
    dateOfBirth: new Date(),
    country: { countryID: 0, countryName: '' },
    isMember: false
  }
  return (
    <GlassyCard
      containerStyle={{ height: 650 }}
      cardContainerStyle={{ padding: 20, paddingVertical: 30 }}
      colors={[
        purplePallet.purpleDarker,
        purplePallet.purpleDarker,
        purplePallet.purpleLight
      ]}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue
        }) => (
          <View style={styles.container}>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              labelStyle={styles.textStyle}
              placeholderTextColor="#ccc"
              // label="First Name"
              placeholder="First Name"
              leftIcon={<SimpleLineIcons name="user" size={20} color="white" />}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              multiline={false}
            />
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              labelStyle={styles.textStyle}
              placeholderTextColor="#ccc"
              // label="Last Name"
              placeholder="Last Name"
              leftIcon={<SimpleLineIcons name="user" size={20} color="white" />}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              multiline={false}
            />
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              labelStyle={styles.textStyle}
              placeholderTextColor="#ccc"
              // label="Email"
              placeholder="Email"
              leftIcon={
                <Ionicons name="mail-outline" size={20} color="white" />
              }
              onChangeText={handleChange('email')}
              onBlur={handleBlur('mail')}
              value={values.email}
              multiline={false}
            />
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              labelStyle={styles.textStyle}
              placeholderTextColor="#ccc"
              multiline={false}
              secureTextEntry={!showPassword}
              // label="Password"
              placeholder="Password"
              leftIcon={<Ionicons name="key" size={20} color="white" />}
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="white"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <RadioGroup
              label="Gender"
              options={genders.map(value => value.genderName)}
              defaultValue="Female"
              setSelectedValue={value =>
                setFieldValue(
                  'gender',
                  genders.find(({ genderName }) => genderName === value)
                )
              }
            />

            <RadioGroup
              label="Are you a member of Gospel Envoy's Church?"
              options={['Yes', 'No']}
              defaultValue="Yes"
              setSelectedValue={value =>
                setFieldValue('isMember', value === 'Yes')
              }
            />

            {/* <DropDownPicker /> */}
            <Picker
              setSelected={value => {
                setFieldValue(
                  'country',
                  countries.find(({ countryName }) => value === countryName)
                )
              }}
              options={countries.map(item => item.countryName)}
            />

            <Button
              style={{ margin: 8 }}
              buttonStyle={{
                borderRadius: 10,
                paddingVertical: 10,
                backgroundColor: '#17171760'
              }}
              titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
              // icon={
              //   <Ionicon
              //     style={{ marginRight: 15 }}
              //     name="mail"
              //     color="#fff"
              //     size={28}
              //   />
              // }
              title="Register"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </GlassyCard>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column'
    // backgroundColor: 'red'
  },
  textStyle: {
    color: '#000000aa'
  },
  inputContainerStyle: {
    borderColor: purplePallet.text,
    borderBottomWidth: 1 / 2
  }
})
