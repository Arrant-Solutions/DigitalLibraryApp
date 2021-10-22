import {Dropdown} from 'react-native-element-dropdown'
import {Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native'
import {Input} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Yup from 'yup'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import {SignupUserI} from '../../../types/User'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import LinearGradient from 'react-native-linear-gradient'
import {ScrollView} from 'react-native-gesture-handler'
import RadioGroup from '../common/RadioGroup'
import {greys, stretchedBox, pcl, shadow} from '../common/style'
import PCLButton from '../common/PCLButton'
import Header from '../common/Header'
import {BranchI} from 'types/Branch'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {AuthStackParamList} from 'components/MainNavigation'
import {StackNavigationProp} from '@react-navigation/stack'
import DatePicker from 'react-native-date-picker'
import {selectAuth, setUser, updateAuth} from 'redux/slices/authSlice'
import {Toast} from '../common/Toast'
import {deserialize} from 'utils'
import {emailRegistration, submitUserDetails} from 'redux/services/auth'
import {useGetInitResourcesQuery} from 'redux/apis/resourceApi'
import SocialAuth from '../common/SocialAuth'
import ModalLoader from '../common/ModalLoader'

type SignupProp = StackNavigationProp<AuthStackParamList, 'Register'>

interface SignupProps {}

interface ListItemI {
  name: string
  id: number
}

const Item = (item: ListItemI) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: greys[40],
    }}>
    <Text style={{fontSize: 13, padding: 12}}>{item.name}</Text>
  </View>
)

const ListItem = React.memo(Item)

const Signup: React.FC<SignupProps> = () => {
  const {navigate} = useNavigation<SignupProp>()
  const dispatch = useAppDispatch()
  const {user, credential} = useAppSelector(selectAuth)
  const {data, error, isLoading} = useGetInitResourcesQuery()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const focused = useIsFocused()
  const [loading, setLoading] = useState(false)
  const [initialValues] = useState<
    SignupUserI & {isMember: boolean; branch: BranchI}
  >({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    password: credential ? 'R@nd0MGarbage' : '',
    fullname: user.fullname || '',
    gender: user.gender || {
      gender_id: 0,
      gender_name: '',
    },
    date_of_birth: user.date_of_birth || new Date(), // moment().subtract(5, 'years').toDate(),
    country: user.country?.country_id
      ? user.country
      : {
          country_id: 0,
          country_name: '',
          flag: '',
        },
    branch: user.branch || {branch_id: 0, branch_name: ''},
    isMember: true,
    user_group: undefined,
    user_status: undefined,
    has_missing: undefined,
  })

  useEffect(() => {
    setLoading(false)
  }, [focused])

  // const initialValues: SignupUserI & {isMember: boolean; branch: BranchI} =

  const renderItem = (item: ListItemI) => <ListItem {...item} />

  const nameValidator = Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
  const dobLower = moment().subtract(110, 'years')
  const dobUpper = moment().subtract(2, 'years')
  const SignupSchema = Yup.object().shape({
    first_name: nameValidator,
    last_name: nameValidator,
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /(?=(.*[a-z]){1,})/,
        'Password must contain at least one lowercase character',
      )
      .matches(
        /(?=(.*[A-Z]){1,})/,
        'Password must contain at least one upper character',
      )
      .matches(/(?=(.*[0-9]){1,})/, 'Password must contain at least one number')
      .matches(
        /(?=(.*[!@#$%^&*()\-__+.]){1,})/,
        'Password must contain at least one special charactor (e.g. !@#$%^&*()-__+.)',
      )
      .required('Password required'),
    date_of_birth: Yup.date()
      .min(dobLower.toDate(), 'Might be too old')
      .max(dobUpper.toDate(), 'Might be too young')
      .required('Date of birth is required'),
    gender: Yup.object()
      .shape({
        gender_id: Yup.number().oneOf(
          data?.genders.map(item => item.gender_id) || [],
        ),
        genderName: Yup.string().oneOf(
          data?.genders.map(item => item.gender_name) || [],
        ),
      })
      .required('Gender is required'),
    country: Yup.object()
      .shape({
        country_id: Yup.number().oneOf(
          data?.countries.map(item => item.country_id) || [],
        ),
        country_name: Yup.string().oneOf(
          data?.countries.map(item => item.country_name) || [],
        ),
      })
      .required('Country is required'),
  })
  return (
    <View style={{flex: 1}}>
      <Header back title="Register" showActionButtons={false} />
      <>
        {isLoading ? (
          <ActivityIndicator
            style={{marginTop: 20}}
            size="large"
            color={pcl.blue}
          />
        ) : (
          <>
            {!(
              data?.genders &&
              data?.genders.length &&
              data?.countries &&
              data?.countries.length &&
              data?.branches &&
              data?.branches.length &&
              data?.userGroups &&
              data?.userGroups.length &&
              data?.userStatuses &&
              data?.userStatuses.length &&
              !error
            ) ? (
              <>
                <Toast
                  style={{marginTop: 35}}
                  type="error-outline"
                  message="Unable to fetch required resources. Please refresh to try again."
                />
                <View
                  style={[
                    {
                      padding: 10,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      borderRadius: 8,
                    },
                    shadow,
                  ]}>
                  <Ionicons name="refresh" size={30} color={pcl.lightBlue} />
                  <Text style={{marginTop: 10}}>Refresh</Text>
                </View>
              </>
            ) : (
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
                        dispatch(
                          setUser(
                            deserialize({
                              ...values,
                              email: values.email.toLowerCase(),
                            }),
                          ),
                        )

                        console.log({
                          ...values,
                          email: values.email.toLowerCase(),
                        })

                        const action =
                          /(.*)@(.*).(.*)/.test(user.email) && credential
                            ? submitUserDetails
                            : emailRegistration

                        action({
                          ...values,
                          email: values.email.toLowerCase(),
                          branch_id: values.branch.branch_id,
                          gender_id: Number(values.gender?.gender_id),
                          country_id: Number(values.country?.country_id),
                        })
                          .then(({data, statusCode}) => {
                            console.log(data)
                            if (
                              statusCode === 200 &&
                              typeof data === 'object'
                            ) {
                              if (
                                /(.*)@(.*).(.*)/.test(user.email) &&
                                credential
                              ) {
                                dispatch(updateAuth(data))
                              } else {
                                Alert.alert(
                                  'Success',
                                  `You account has been created successfully. A verification link will be sent to ${values.email}. Please verify your account to access the app.`,
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
                              }
                            } else {
                              Alert.alert(
                                'Failure',
                                data as string, // always a string here
                                [
                                  {
                                    text: 'Cancel',
                                    style: 'cancel',
                                  },
                                ],
                                {cancelable: true},
                              )
                            }
                          })
                          .catch()
                          .finally(() => helpers.setSubmitting(false))
                      }}>
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isSubmitting,
                        setFieldValue,
                        setFieldError,
                        setErrors,
                      }) => {
                        return (
                          <ScrollView style={styles.container}>
                            <SocialAuth setLoading={setLoading} signup />
                            <Input
                              inputContainerStyle={styles.inputContainerStyle}
                              labelStyle={styles.textStyle}
                              placeholderTextColor={pcl.textPlaceholder}
                              errorMessage={errors.first_name}
                              errorStyle={
                                errors.first_name ? styles.inputErrorStyle : {}
                              }
                              placeholder="First Name"
                              leftIcon={
                                <SimpleLineIcons
                                  name="user"
                                  size={20}
                                  color={pcl.textPlaceholder}
                                />
                              }
                              onChangeText={handleChange('first_name')}
                              onBlur={handleBlur('first_name')}
                              value={values.first_name}
                              multiline={false}
                            />
                            <Input
                              inputContainerStyle={styles.inputContainerStyle}
                              errorStyle={
                                errors.last_name ? styles.inputErrorStyle : {}
                              }
                              labelStyle={styles.textStyle}
                              placeholderTextColor={pcl.textPlaceholder}
                              errorMessage={errors.last_name}
                              placeholder="Last Name"
                              leftIcon={
                                <SimpleLineIcons
                                  name="user"
                                  size={20}
                                  color={pcl.textPlaceholder}
                                />
                              }
                              onChangeText={handleChange('last_name')}
                              onBlur={handleBlur('last_name')}
                              value={values.last_name}
                              multiline={false}
                            />
                            {!Boolean(credential) && (
                              <Input
                                inputContainerStyle={styles.inputContainerStyle}
                                errorStyle={
                                  errors.email ? styles.inputErrorStyle : {}
                                }
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
                            )}
                            <Pressable
                              style={{position: 'relative', flex: 1}}
                              onPress={() => {
                                console.log('pressed')
                                setShowDatePicker(true)
                              }}>
                              <Input
                                inputContainerStyle={styles.inputContainerStyle}
                                errorStyle={
                                  errors.date_of_birth
                                    ? styles.inputErrorStyle
                                    : {}
                                }
                                disabled={true}
                                errorMessage={
                                  errors.date_of_birth &&
                                  String(errors.date_of_birth)
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
                                value={moment(values.date_of_birth).format(
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
                              maximumDate={moment()
                                .subtract(5, 'years')
                                .toDate()}
                              minimumDate={moment()
                                .subtract(105, 'years')
                                .toDate()}
                              modal
                              open={showDatePicker}
                              date={new Date(values.date_of_birth)}
                              onConfirm={date => {
                                setShowDatePicker(false)
                                setFieldValue('date_of_birth', date)
                              }}
                              onDateChange={date => {
                                setShowDatePicker(false)
                                setFieldValue('date_of_birth', date)
                              }}
                              onCancel={() => {
                                setShowDatePicker(false)
                              }}
                            />
                            {!credential && (
                              <Input
                                inputContainerStyle={styles.inputContainerStyle}
                                errorStyle={
                                  errors.first_name
                                    ? styles.inputErrorStyle
                                    : {}
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
                                      showPassword
                                        ? 'eye-off-outline'
                                        : 'eye-outline'
                                    }
                                    size={20}
                                    color="white"
                                    onPress={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                }
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                              />
                            )}
                            <RadioGroup
                              labelStyle={{color: pcl.black}}
                              label="Gender"
                              checkedColor={pcl.lightBlue}
                              uncheckedColor={pcl.textPlaceholder}
                              titleStyle={{color: pcl.textPlaceholder}}
                              options={data?.genders.map(
                                value => value.gender_name,
                              )}
                              defaultValue={String(values.gender?.gender_name)}
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
                                  data?.genders.find(
                                    ({gender_name}) => gender_name === value,
                                  ),
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
                                if (value === 'Yes') {
                                  setFieldValue('country', {
                                    country_name: '',
                                    country_id: undefined,
                                  })
                                  setFieldError(
                                    'country',
                                    'Select country from dropdown',
                                  )
                                  setErrors({
                                    ...errors,
                                    country: {
                                      country_name: '',
                                      country_id: undefined,
                                    } as any,
                                  })
                                } else {
                                  setFieldValue('branch', {
                                    branch_name: '',
                                    branch_id: 0,
                                  })
                                  setFieldError(
                                    'branch',
                                    'Select branch from dropdown',
                                  )
                                  setErrors({
                                    ...errors,
                                    branch: {
                                      branch_name: '',
                                      branch_id: undefined,
                                    },
                                  })
                                }
                                setFieldValue('isMember', value === 'Yes')
                              }}
                            />

                            {values.isMember ? (
                              <Dropdown
                                style={styles.dropdown}
                                data={data.branches.map(item => ({
                                  id: item.branch_id,
                                  name: item.branch_name,
                                }))}
                                search
                                searchPlaceholder="Search"
                                labelField="name"
                                valueField="id"
                                placeholder="Select Church/Organization"
                                value={values.branch?.branch_id}
                                onChange={(item: ListItemI) => {
                                  console.log(item)
                                  const branch = data?.branches.find(
                                    ({branch_id}) => branch_id === item.id,
                                  )
                                  // console.log(branch)?
                                  if (!branch) {
                                    setFieldError(
                                      'branch',
                                      'Select branch from dropdown',
                                    )
                                  } else {
                                    setErrors({...errors, branch: undefined})
                                    setFieldValue('branch', branch)
                                    setFieldValue('country', {
                                      country_id: 249,
                                      country_name: 'Zambia',
                                    })
                                  }
                                }}
                                renderItem={item => renderItem(item)}
                              />
                            ) : (
                              <Dropdown
                                style={styles.dropdown}
                                data={data?.countries.map(item => ({
                                  id: item.country_id,
                                  name: item.country_name,
                                }))}
                                search
                                searchPlaceholder="Search"
                                labelField="name"
                                valueField="id"
                                placeholder="Select Country"
                                value={values.country?.country_id}
                                onChange={(item: ListItemI) => {
                                  const country = data?.countries.find(
                                    ({country_id}) => country_id === item.id,
                                  )
                                  if (!country) {
                                    setFieldError(
                                      'country',
                                      'Select country from dropdown',
                                    )
                                  } else {
                                    setErrors({...errors, country: undefined})
                                    setFieldValue('country', country)
                                  }
                                }}
                                renderItem={item => renderItem(item)}
                              />
                            )}

                            <PCLButton
                              loading={isSubmitting}
                              disabled={Boolean(
                                errors.first_name ||
                                  errors.last_name ||
                                  errors.email ||
                                  errors.gender ||
                                  errors.date_of_birth ||
                                  (!credential && errors.password) ||
                                  (values.isMember &&
                                    (errors.branch ||
                                      !values.branch.branch_id)) ||
                                  (!values.isMember &&
                                    (errors.country ||
                                      !values.country?.country_id)),
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
                <ModalLoader transparent={true} visible={loading} />
              </ScrollView>
            )}
          </>
        )}
      </>
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
