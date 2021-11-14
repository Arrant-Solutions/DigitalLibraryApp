import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import moment from 'moment'
import React, {useState} from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Dropdown} from 'react-native-element-dropdown'
import {Input} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {useGetInitResourcesQuery} from 'redux/apis/resourceApi'
import {useAppDispatch} from 'redux/hooks'
import {emailRegistration} from 'redux/services/auth'
import {setAlert} from 'redux/slices/alertSlice'
import {updateAuth} from 'redux/slices/authSlice'
import {BranchI} from 'types/Branch'
import {CountryI} from 'types/Country'
import {GenderI} from 'types/Gender'
import Header from '../common/Header'
import PCLButton from '../common/PCLButton'
import PCLDatePicker from '../common/PCLDatePicker'
import RadioGroup from '../common/RadioGroup'
import SocialAuth from '../common/SocialAuth'
import {greys, pcl, shadow, stretchedBox} from '../common/style'
import {Toast} from '../common/Toast'

interface FormItem<T = string> {
  value: T
  error: string
}

interface FormI {
  first_name: FormItem
  last_name: FormItem
  email: FormItem
  date_of_birth: FormItem<Date>
  password: FormItem
  is_member: FormItem<boolean>
  country: FormItem<CountryI>
  gender: FormItem<GenderI>
  branch: FormItem<BranchI>
}

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

type SignupProp = StackNavigationProp<AuthStackParamList, 'Email Signup'>

const defaults = {
  first_name: {value: '', error: ''},
  last_name: {value: '', error: ''},
  email: {value: '', error: ''},
  date_of_birth: {value: new Date(), error: ''},
  password: {value: '', error: ''},
  is_member: {value: true, error: ''},
  country: {
    value: {country_id: 2, country_name: 'Zambia'},
    error: '',
  },
  gender: {
    value: {
      gender_id: 249,
      gender_name: 'Female',
    },
    error: '',
  },
  branch: {value: {branch_id: 0, branch_name: ''}, error: ''},
}

const EmailSignup = () => {
  const dispatch = useAppDispatch()
  const {navigate} = useNavigation<SignupProp>()
  const {data, error, isLoading} = useGetInitResourcesQuery()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<FormI>({
    ...defaults,
    country: {
      value: data?.countries.find(
        ({country_name}) => country_name === 'Zambia',
      ) || {country_id: 249, country_name: 'Zambia'},
      error: '',
    },
    gender: {
      value: data?.genders.find(
        ({gender_name}) => gender_name === 'Female',
      ) || {
        gender_id: 2,
        gender_name: 'Female',
      },
      error: '',
    },
  })

  const handleChange = (
    key: keyof FormI,
    inputValue: string | number | Date | boolean,
  ) => {
    let result:
      | FormItem<string>
      | FormItem<Date>
      | FormItem<boolean>
      | FormItem<CountryI>
      | FormItem<GenderI>
      | FormItem<BranchI>
      | Partial<FormI> = form[key]

    const value: string | number | Date = inputValue as string

    switch (key) {
      case 'first_name':
      case 'last_name':
        if (!value) {
          result = {
            value,
            error: key.replace('_', ' ') + ' is required',
          }
        } else if (
          !/^(?!.*([A-Za-z0-9])\1{2})[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(
            value as string,
          )
        ) {
          result = {
            value,
            error: 'Please input a valid name',
          }
        } else if (String(value).length < 2) {
          result = {
            value,
            error: key.replace('_', ' ') + ' is too short',
          }
        } else if (String(value).length > 50) {
          result = {
            value,
            error: key.replace('_', ' ') + ' is too long',
          }
        } else {
          result = {
            value,
            error: '',
          }
        }

        result = {[key]: result}
        break

      case 'email':
        if (!value) {
          result = {
            value,
            error: 'email address is required',
          }
        } else if (
          !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value as string,
          )
        ) {
          result = {
            value,
            error: 'Please input a valid email address',
          }
        } else {
          result = {
            value,
            error: '',
          }
        }
        result = {[key]: result}
        break

      case 'date_of_birth':
        if (!value) {
          result = {
            value,
            error: 'date of birth is required',
          }
        }

        const dobLower = moment().subtract(110, 'years')
        const dobUpper = moment().subtract(2, 'years')

        const dob = moment(value)

        if (!dob.isValid()) {
          result = {
            value,
            error: 'Please input a valid date of birth',
          }
        } else if (dob.isSameOrBefore(dobLower)) {
          result = {
            value,
            error: 'Might be too old',
          }
        } else if (dob.isSameOrAfter(dobUpper)) {
          result = {
            value,
            error: 'Might be too young',
          }
        } else {
          result = {value: new Date(value), error: ''}
        }

        result = {[key]: result as FormItem<Date>}
        break

      case 'password':
        if (!value) {
          result = {
            value,
            error: 'Password is required',
          }
        } else if ((value as string).length < 8) {
          result = {
            value,
            error: 'Password must be at least 8 characters long',
          }
        } else if (!/(?=(.*[!@#$%^&*()\-__+.]){1,})/.test(value as string)) {
          result = {
            value,
            error:
              'Password must contain at least one special charactor (e.g. !@#$%^&*()-__+.)',
          }
        } else {
          result = {value, error: ''}
        }
        result = {[key]: result}
        break

      case 'is_member':
        result = {value: Boolean(value), error: ''}
        result = {[key]: result}
        break

      case 'gender':
        const gender = data?.genders.find(item => (item.gender_name = value))

        if (!gender) {
          result = {
            value: {gender_id: 0, gender_name: 'Invalid'},
            error: 'Please pick a valid gender',
          }
        } else {
          result = {value: gender, error: ''}
        }
        result = {[key]: result}
        break

      case 'country':
        const country = data?.countries.find(
          item => item.country_name === value,
        )

        if (!country) {
          result = {
            value: {country_id: 0, country_name: 'Invalid'},
            error: 'Please pick a valid country',
          }
        } else {
          result = {value: country, error: ''}
        }

        result = {
          [key]: result,
          branch: {
            value: {branch_id: 0, branch_name: ''},
            error: '',
          },
        }
        break

      case 'branch':
        const branch = data?.branches.find(item => item.branch_name === value)

        if (!branch) {
          result = {
            value: {branch_id: 0, branch_name: 'Invalid'},
            error: 'Please pick a valid branch',
          }
        } else {
          result = {value: branch, error: ''}
        }

        break
    }

    setForm({
      ...form,
      ...result,
    })
  }

  const handleSubmit = () => {
    setLoading(true)
    emailRegistration({
      // ...values,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      date_of_birth: form.date_of_birth.value,
      email: form.email.value.toLowerCase(),
      password: form.password.value,
      gender_id: form.gender.value.gender_id,
      branch_id: form.branch.value.branch_id,
      country_id: form.country.value.country_id,
    })
      .then(({data, statusCode}) => {
        console.log(data)
        if (statusCode === 200 && typeof data === 'object') {
          dispatch(
            setAlert({
              title: 'Success',
              message: `You account has been created successfully. A verification link will be sent to ${form.email.value}. Please verify your account to access the app.`,
              buttons: [
                {
                  text: 'Login',
                  onPress: () => {
                    setForm(defaults)
                    navigate('Login')
                  },
                },
              ],
            }),
          )
        } else {
          dispatch(
            setAlert({
              title: 'Failed',
              message: data as string,
            }),
          )
        }
      })
      .catch(() =>
        dispatch(
          setAlert({
            title: 'Error Occured',
            message: GENERIC_SERVER_ERROR,
          }),
        ),
      )
      .finally(() => setLoading(false))
  }

  const renderItem = (item: ListItemI) => <ListItem {...item} />

  return (
    <View style={styles.container}>
      <Header back title="Register" showActionButtons={false} />
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
            <ScrollView style={styles.container}>
              <KeyboardAvoidingView>
                <LinearGradient
                  colors={[pcl.background, pcl.background]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  useAngle
                  angle={110}
                  style={[
                    stretchedBox,
                    {
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    },
                  ]}>
                  <SocialAuth setLoading={setLoading} signup />
                  <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    labelStyle={styles.textStyle}
                    placeholderTextColor={pcl.textPlaceholder}
                    errorMessage={form.first_name.error}
                    errorStyle={
                      form.first_name.error ? styles.inputErrorStyle : {}
                    }
                    placeholder="First Name"
                    leftIcon={
                      <SimpleLineIcons
                        name="user"
                        size={20}
                        color={pcl.textPlaceholder}
                      />
                    }
                    onChangeText={text => handleChange('first_name', text)}
                    // onBlur={handleBlur('first_name')}
                    value={form.first_name.value as string}
                    multiline={false}
                  />
                  <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    errorStyle={
                      form.last_name.error ? styles.inputErrorStyle : {}
                    }
                    labelStyle={styles.textStyle}
                    placeholderTextColor={pcl.textPlaceholder}
                    errorMessage={form.last_name.error}
                    placeholder="Last Name"
                    leftIcon={
                      <SimpleLineIcons
                        name="user"
                        size={20}
                        color={pcl.textPlaceholder}
                      />
                    }
                    onChangeText={text => handleChange('last_name', text)}
                    // onBlur={handleBlur('last_name')}
                    value={form.last_name.value as string}
                    multiline={false}
                  />
                  <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    errorStyle={form.email.error ? styles.inputErrorStyle : {}}
                    errorMessage={form.email.error}
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
                    onChangeText={value => handleChange('email', value)}
                    // onBlur={handleBlur('mail')}
                    value={form.email.value as string}
                    multiline={false}
                  />
                  <PCLDatePicker
                    errorMessage={form.date_of_birth.error}
                    value={form.date_of_birth.value as Date}
                    onChange={date => handleChange('date_of_birth', date)}
                  />
                  <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    errorStyle={
                      form.first_name.error ? styles.inputErrorStyle : {}
                    }
                    labelStyle={styles.textStyle}
                    placeholderTextColor={pcl.textPlaceholder}
                    multiline={false}
                    secureTextEntry={!showPassword}
                    errorMessage={form.password.error}
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
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="white"
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    onChangeText={value => handleChange('password', value)}
                    // onBlur={handleBlur('password')}
                    value={form.password.value as string}
                  />
                  <RadioGroup
                    labelStyle={{color: pcl.black}}
                    label="Gender"
                    checkedColor={pcl.lightBlue}
                    uncheckedColor={pcl.textPlaceholder}
                    titleStyle={{color: pcl.textPlaceholder}}
                    options={data?.genders.map(value => value.gender_name)}
                    defaultValue={String(form.gender.value.gender_name)}
                    errorMessage={
                      Boolean(form.gender.error) ? 'Pick a gender' : ''
                    }
                    errorStyle={
                      Boolean(form.gender.error)
                        ? styles.inputErrorStyle
                        : styles.inputErrorStyle
                    }
                    setSelectedValue={value => handleChange('gender', value)}
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
                        handleChange('country', 'Zambia')
                        handleChange('branch', '')
                      } else {
                        handleChange('country', '')
                      }
                      handleChange('is_member', value === 'Yes')
                    }}
                  />

                  {form.is_member.value ? (
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
                      value={form.branch.value.branch_id}
                      onChange={(item: ListItemI) => {
                        console.log(item)
                        handleChange('branch', item.name)
                        handleChange('country', 'Zambia')
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
                      value={form.country.value.country_id}
                      onChange={(item: ListItemI) =>
                        handleChange('country', item.name)
                      }
                      renderItem={item => renderItem(item)}
                    />
                  )}

                  <PCLButton
                    loading={loading}
                    disabled={Boolean(
                      form.first_name.error ||
                        form.last_name.error ||
                        form.email.error ||
                        form.gender.error ||
                        form.date_of_birth.error ||
                        form.password.error ||
                        (form.is_member.value &&
                          !form.branch.value.branch_id) ||
                        (!form.is_member.value &&
                          !form.country.value.country_id),
                    )}
                    title="Register"
                    onPress={handleSubmit}
                  />
                </LinearGradient>
              </KeyboardAvoidingView>
            </ScrollView>
          )}
        </>
      )}
    </View>
  )
}

export default EmailSignup

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
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
