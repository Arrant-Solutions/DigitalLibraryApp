import {Dropdown} from 'react-native-element-dropdown'
import {Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from 'react-native'
import {Input, SocialIcon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
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
import {BranchI} from 'models/branch'
import {useNavigation} from '@react-navigation/native'
import {AuthStackParamList} from 'components/MainNavigation'
import {StackNavigationProp} from '@react-navigation/stack'
import DatePicker from 'react-native-date-picker'
import {setUser} from 'redux/slices/authSlice'
import {deserialize} from 'utils'

type SignupProp = StackNavigationProp<AuthStackParamList, 'Register'>

const branches: BranchI[] = [
  {branchName: 'Chudleigh', branchID: 1},
  {branchName: 'City Center', branchID: 2},
]

interface SignupProps {}

const Item = (item: CountryI) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: greys[40],
    }}>
    <Text style={{fontSize: 13, padding: 12}}>{item.countryName}</Text>
  </View>
)

const CountryItem = React.memo(Item)

const Signup: React.FC<SignupProps> = () => {
  const {navigate} = useNavigation<SignupProp>()
  const dispatch = useAppDispatch()
  const {countries, genders, errorMessage} = useAppSelector(selectResources)
  const [showDatePicker, setShowDatePicker] = useState(false)

  console.log(errorMessage)

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
  const initialValues: SignupUserI & {isMember: boolean; branch: BranchI} = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    fullname: '',
    gender: genders.find(({genderName}) => genderName === 'Female') || {
      genderID: 0,
      genderName: '',
    },
    dateOfBirth: moment().subtract(5, 'years').toDate(),
    country: {countryID: 0, countryName: '', flag: ''},
    branch: {branchID: 0, branchName: ''},
    isMember: true,
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
            <Formik
              validationSchema={SignupSchema}
              initialValues={initialValues}
              onSubmit={(values, helpers) => {
                console.log(helpers)
                helpers.setSubmitting(false)
                dispatch(setUser(deserialize(values)))

                Alert.alert(
                  'Success',
                  'Account created successfully.',
                  [
                    {
                      text: 'Login',
                      onPress: () => {
                        helpers.resetForm()
                        navigate('Login')
                      },
                    },
                  ],
                  {cancelable: false},
                )
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
                setFieldError,
                setErrors,
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
                        <SimpleLineIcons
                          name="user"
                          size={20}
                          color={pcl.textPlaceholder}
                        />
                      }
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      multiline={false}
                    />
                    <Input
                      inputContainerStyle={styles.inputContainerStyle}
                      errorStyle={errors.lastName ? styles.inputErrorStyle : {}}
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
                      errorMessage={errors.lastName}
                      placeholder="Last Name"
                      leftIcon={
                        <SimpleLineIcons
                          name="user"
                          size={20}
                          color={pcl.textPlaceholder}
                        />
                      }
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      multiline={false}
                    />
                    <Input
                      inputContainerStyle={styles.inputContainerStyle}
                      errorStyle={errors.email ? styles.inputErrorStyle : {}}
                      errorMessage={errors.email}
                      labelStyle={styles.textStyle}
                      placeholderTextColor={pcl.textPlaceholder}
                      placeholder="Email"
                      leftIcon={
                        <Ionicons
                          name="mail-outline"
                          size={20}
                          color={pcl.textPlaceholder}
                        />
                      }
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('mail')}
                      value={values.email}
                      multiline={false}
                    />
                    <Pressable
                      style={{position: 'relative', flex: 1}}
                      onPress={() => {
                        console.log('pressed')
                        setShowDatePicker(true)
                      }}>
                      <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        errorStyle={
                          errors.dateOfBirth ? styles.inputErrorStyle : {}
                        }
                        disabled={true}
                        errorMessage={
                          errors.dateOfBirth && String(errors.dateOfBirth)
                        }
                        labelStyle={styles.textStyle}
                        placeholderTextColor={pcl.textPlaceholder}
                        placeholder="Date of Birth"
                        leftIcon={
                          <FontAwesome5
                            name="baby"
                            size={20}
                            color={pcl.textPlaceholder}
                          />
                        }
                        value={moment(values.dateOfBirth).format(
                          'MMMM DD, YYYY',
                        )}
                        multiline={false}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Pressable>
                    <DatePicker
                      mode="date"
                      maximumDate={moment().subtract(5, 'years').toDate()}
                      minimumDate={moment().subtract(105, 'years').toDate()}
                      modal
                      open={showDatePicker}
                      date={new Date(values.dateOfBirth)}
                      onConfirm={date => {
                        setShowDatePicker(false)
                        setFieldValue('dateOfBirth', date)
                      }}
                      onDateChange={date => {
                        setShowDatePicker(false)
                        setFieldValue('dateOfBirth', date)
                      }}
                      onCancel={() => {
                        setShowDatePicker(false)
                      }}
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
                      leftIcon={
                        <Ionicons
                          name="key"
                          size={20}
                          color={pcl.textPlaceholder}
                        />
                      }
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
                      defaultValue="Yes"
                      setSelectedValue={value => {
                        console.log(
                          errors.firstName,
                          errors.lastName,
                          errors.email,
                          errors.gender,
                          errors.password,
                          errors.dateOfBirth,
                          (errors.branch, errors.country),
                        )
                        if (value === 'Yes') {
                          setFieldValue('country', {
                            countryName: '',
                            countryID: undefined,
                          })
                          setFieldError(
                            'country',
                            'Select country from dropdown',
                          )
                          setErrors({
                            ...errors,
                            country: {countryName: '', countryID: undefined},
                          })
                        } else {
                          setFieldValue('branch', {
                            branchName: '',
                            branchID: 0,
                          })
                          setFieldError('branch', 'Select branch from dropdown')
                          setErrors({
                            ...errors,
                            branch: {
                              branchName: '',
                              branchID: undefined,
                            },
                          })
                        }
                        setFieldValue('isMember', value === 'Yes')
                      }}
                    />

                    {values.isMember ? (
                      <Dropdown
                        style={styles.dropdown}
                        data={branches.map(item => ({
                          countryID: item.branchID,
                          countryName: item.branchName,
                        }))}
                        search
                        searchPlaceholder="Search"
                        labelField="countryName"
                        valueField="countryID"
                        placeholder="Select Church/Organization"
                        value={values.branch?.branchID}
                        onChange={(item: CountryI) => {
                          const branch = branches.find(
                            ({branchID}) => branchID === item.countryID,
                          )
                          if (!branch) {
                            setFieldError(
                              'branch',
                              'Select branch from dropdown',
                            )
                          } else {
                            setErrors({...errors, branch: undefined})
                            setFieldValue('branch', item)
                            console.log('selected', item)
                          }
                          setFieldValue('branch', {
                            branchID: item.countryID,
                            branchName: item.countryName,
                          })
                        }}
                        renderItem={item => renderItem(item)}
                      />
                    ) : (
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
                          const country = countries.find(
                            ({countryID}) => countryID === item.countryID,
                          )
                          if (!country) {
                            setFieldError(
                              'country',
                              'Select country from dropdown',
                            )
                          } else {
                            setErrors({...errors, country: undefined})
                            setFieldValue('country', item)
                            console.log('selected', item)
                          }
                        }}
                        renderItem={item => renderItem(item)}
                      />
                    )}

                    <PCLButton
                      disabled={Boolean(
                        errors.firstName ||
                          errors.lastName ||
                          errors.email ||
                          errors.gender ||
                          errors.password ||
                          errors.dateOfBirth ||
                          (errors.branch && errors.country),
                      )}
                      title="Register"
                      onPress={handleSubmit}
                    />
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
  },
  dropdown: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
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
