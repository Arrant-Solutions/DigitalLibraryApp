import {Dropdown} from 'react-native-element-dropdown'
import {Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import {Input, SocialIcon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Yup from 'yup'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import {SignupUserI} from '../../../models/user'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {
  fetchCountries,
  fetchGenders,
  ResourceSliceI,
  restoreResources,
  selectResources,
} from '../../../redux/slices/resourceSlice'
import LinearGradient from 'react-native-linear-gradient'
import {ScrollView} from 'react-native-gesture-handler'
import {CountryI} from '../../../models/country'
import RadioGroup from '../common/RadioGroup'
import {
  greys,
  stretchedBox,
  flexRow,
  socialButton,
  googleBlue,
  pcl,
} from '../common/style'
import PCLButton from '../common/PCLButton'
import Header from '../common/Header'

interface SignupProps {}

const Item = (item: CountryI) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: greys[40],
    }}>
    {/* <SvgUri width={30} height={15} uri={item.flag} /> */}
    <Text style={{fontSize: 13, padding: 12}}>{item.countryName}</Text>
  </View>
)

const CountryItem = React.memo(Item)

const Signup: React.FC<SignupProps> = () => {
  const dispatch = useAppDispatch()
  const {countries, genders, errorMessage} = useAppSelector(selectResources)

  useEffect(() => {
    dispatch(restoreResources()).then(({payload}) => {
      console.log(payload)
      const {genders, countries} = payload as ResourceSliceI

      if (genders.length === 0) {
        dispatch(fetchGenders())
      }

      if (countries.length === 0) {
        dispatch(fetchCountries())
      }
    })
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const initialValues: SignupUserI & {isMember: boolean} = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    fullname: '',
    gender: genders.find(({genderName}) => genderName === 'Female') || {
      genderID: 0,
      genderName: 'male',
    },
    dateOfBirth: '1990-10-31',
    country: {countryID: 0, countryName: '', flag: ''},
    isMember: false,
  }

  const renderItem = (item: CountryI) => <CountryItem {...item} />

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
      genderName: Yup.string().oneOf(genders.map(item => item.genderName)),
    }),
    country: Yup.object().shape({
      countryID: Yup.number().oneOf(countries.map(item => item.countryID)),
      countryName: Yup.string().oneOf(countries.map(item => item.countryName)),
    }),
  })
  return (
    <View style={{flex: 1}}>
      <Header back title="Register" showActionButtons={false} />
      <ScrollView>
        <KeyboardAvoidingView>
          <LinearGradient
            colors={[pcl.background, pcl.background]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            useAngle
            angle={110}
            style={stretchedBox}>
            {/* <Image style={{ height:30, width:90}} source={{ uri: 'https://restcountries.eu/data/asm.svg' }} /> */}
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
                setFieldValue,
              }) => {
                return (
                  <ScrollView style={styles.container}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        marginVertical: 10,
                        fontSize: 15,
                        color: pcl.black,
                      }}>
                      Sign up with one of the following options.
                    </Text>
                    <View
                      style={[
                        flexRow,
                        {justifyContent: 'space-between', marginBottom: 10},
                      ]}>
                      <SocialIcon
                        style={socialButton}
                        underlayColor={`${googleBlue}60`}
                        button
                        iconSize={20}
                        type="facebook"
                        onPress={() => console.log('pressed')}
                      />
                      <SocialIcon
                        style={{
                          ...socialButton,
                          backgroundColor: googleBlue,
                        }}
                        iconSize={20}
                        underlayColor={`${googleBlue}60`}
                        button
                        type="google"
                        onPress={() => console.log('pressed')}
                      />
                    </View>
                    <Input
                      inputContainerStyle={styles.inputContainerStyle}
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
                      errorMessage={errors.firstName}
                      errorStyle={
                        errors.firstName ? styles.inputErrorStyle : {}
                      }
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
                      errorStyle={
                        errors.firstName ? styles.inputErrorStyle : {}
                      }
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
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
                      errorStyle={
                        errors.firstName ? styles.inputErrorStyle : {}
                      }
                      errorMessage={errors.email}
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
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
                      errorStyle={
                        errors.firstName ? styles.inputErrorStyle : {}
                      }
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
                      multiline={false}
                      secureTextEntry={!showPassword}
                      errorMessage={errors.password}
                      placeholder="Password"
                      leftIcon={<Ionicons name="key" size={20} color="white" />}
                      rightIcon={
                        <Ionicons
                          name={
                            showPassword ? 'eye-off-outline' : 'eye-outline'
                          }
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
                      labelStyle={{color: pcl.black}}
                      label="Gender"
                      checkedColor={pcl.lightBlue}
                      uncheckedColor={pcl.textPlaceholder}
                      titleStyle={{color: pcl.textPlaceholder}}
                      options={genders.map(value => value.genderName)}
                      defaultValue="Female"
                      errorMessage={
                        Boolean(errors.gender) ? 'Pick a gender' : ''
                      }
                      errorStyle={
                        Boolean(errors.gender)
                          ? styles.inputErrorStyle
                          : styles.inputErrorStyle
                      }
                      setSelectedValue={value =>
                        setFieldValue(
                          'gender',
                          genders.find(({genderName}) => genderName === value),
                        )
                      }
                    />

                    <RadioGroup
                      labelStyle={{color: pcl.black}}
                      label="Are you a member of Gospel Envoy's Church?"
                      checkedColor={pcl.lightBlue}
                      uncheckedColor={pcl.textPlaceholder}
                      titleStyle={{color: pcl.textPlaceholder}}
                      options={['Yes', 'No']}
                      defaultValue="No"
                      setSelectedValue={value =>
                        setFieldValue('isMember', value === 'Yes')
                      }
                    />

                    {!values.isMember && (
                      <Dropdown
                        style={styles.dropdown}
                        data={countries}
                        search
                        searchPlaceholder="Search"
                        labelField="countryName"
                        valueField="countryID"
                        placeholder="Select Country"
                        value={values.country.countryID}
                        onChange={(item: CountryI) => {
                          setFieldValue('country', item)
                          console.log('selected', item)
                        }}
                        renderItem={item => renderItem(item)}
                      />
                    )}

                    <PCLButton title="Register" onPress={handleSubmit} />
                  </ScrollView>
                )
              }}
            </Formik>
          </LinearGradient>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '3%',
    // backgroundColor: 'red'
  },
  textStyle: {
    color: '#000000aa',
  },
  inputContainerStyle: {
    borderColor: pcl.black,
    borderBottomWidth: 1 / 2,
  },
  inputErrorStyle: {
    padding: 5,
    borderRadius: 5,
    color: 'red',
    // backgroundColor: `${purplePallet.purpleDeeper}90`
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
})
