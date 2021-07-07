import { PayloadAction } from '@reduxjs/toolkit'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Yup from 'yup'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
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
import { purplePallet } from '../../common/style'

interface SignupProps {}

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
    isMember: true
  }

  const nameValidator = Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
  const dobLower = moment().subtract(110, 'years')
  const dobUpper = moment().subtract(2, 'years')
  const SignupSchema = Yup.object().shape({
    firstName: nameValidator,
    lastName: nameValidator,
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too short').required('Required'),
    dateOfBirth: Yup.date()
      .min(dobLower.toDate(), 'Might be too old')
      .max(dobUpper.toDate(), 'Might be too young')
      .required('Required'),
    gender: Yup.object().shape({
      genderID: Yup.number().oneOf(genders.map(item => item.genderID)),
      genderName: Yup.string().oneOf(genders.map(item => item.genderName))
    }),
    country: Yup.object().shape({
      countryID: Yup.number().oneOf(countries.map(item => item.countryID)),
      countryName: Yup.string().oneOf(countries.map(item => item.countryName))
    })
  })
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
        validationSchema={SignupSchema}
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue
        }) => {
          console.log(errors)

          return (
            <View style={styles.container}>
              <Input
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.textStyle}
                placeholderTextColor="#ccc"
                errorMessage={errors.firstName}
                errorStyle={errors.firstName ? styles.inputErrorStyle : {}}
                placeholder="First Name"
                leftIcon={
                  <SimpleLineIcons name="user" size={20} color="white" />
                }
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                multiline={false}
              />
              <Input
                inputContainerStyle={styles.inputContainerStyle}
                errorStyle={errors.firstName ? styles.inputErrorStyle : {}}
                labelStyle={styles.textStyle}
                placeholderTextColor="#ccc"
                errorMessage={errors.lastName}
                placeholder="Last Name"
                leftIcon={
                  <SimpleLineIcons name="user" size={20} color="white" />
                }
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                multiline={false}
              />
              <Input
                inputContainerStyle={styles.inputContainerStyle}
                errorStyle={errors.firstName ? styles.inputErrorStyle : {}}
                errorMessage={errors.email}
                labelStyle={styles.textStyle}
                placeholderTextColor="#ccc"
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
                errorStyle={errors.firstName ? styles.inputErrorStyle : {}}
                labelStyle={styles.textStyle}
                placeholderTextColor="#ccc"
                multiline={false}
                secureTextEntry={!showPassword}
                errorMessage={errors.password}
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
                errorMessage={Boolean(errors.gender) ? 'Pick a gender' : ''}
                errorStyle={
                  Boolean(errors.gender)
                    ? styles.inputErrorStyle
                    : styles.inputErrorStyle
                }
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

              {!values.isMember && (
                <Picker
                  errorMessage="le bugeses"
                  setSelected={value => {
                    setFieldValue(
                      'country',
                      countries.find(({ countryName }) => value === countryName)
                    )
                  }}
                  options={countries.map(item => item.countryName)}
                />
              )}

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
          )
        }}
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
  },
  inputErrorStyle: {
    padding: 5,
    borderRadius: 5,
    color: 'white',
    backgroundColor: `${purplePallet.purpleDeeper}90`
  }
})
