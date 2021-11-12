import React, {useState} from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Input} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {useGetInitResourcesQuery} from 'redux/apis/resourceApi'
import {GenericUserI} from 'types/User'
import Header from '../common/Header'
import PCLDatePicker from '../common/PCLDatePicker'
import SocialAuth from '../common/SocialAuth'
import {pcl, shadow, stretchedBox} from '../common/style'
import {Toast} from '../common/Toast'

interface FormItem {
  value: string | number | Date
  error: string
}

type FormKey =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'date_of_birth'
  | 'gender_id'
  | 'country_id'
  | 'user_group_id'
  | 'password'
  | 'branch_id'

const EmailSignup = () => {
  const {data, error, isLoading} = useGetInitResourcesQuery()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<Record<FormKey, FormItem>>({
    first_name: {value: '', error: ''},
    last_name: {value: '', error: ''},
    email: {value: '', error: ''},
    date_of_birth: {value: '', error: ''},
    country_id: {value: '', error: ''},
    gender_id: {value: '', error: ''},
    user_group_id: {value: '', error: ''},
    password: {value: '', error: ''},
    branch_id: {value: '', error: ''},
  })

  const handleChange = (key: FormKey, value: string | number | Date) => {
    let data = form[key]

    switch (key) {
      case 'first_name':
      case 'last_name':
        if (!value) {
          data = {
            value,
            error: key.replace('_', ' ') + ' is required',
          }
        } else if (
          !/^(?!.*([A-Za-z0-9])\1{2})[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(
            value as string,
          )
        ) {
          data = {
            value,
            error: 'Please input a valid name',
          }
        } else if (String(value).length < 2) {
          data = {
            value,
            error: key.replace('_', ' ') + ' is too short',
          }
        } else if (String(value).length > 50) {
          data = {
            value,
            error: key.replace('_', ' ') + ' is too long',
          }
        } else {
          data = {
            value,
            error: '',
          }
        }
        break

      case 'email':
        if (!value) {
          data = {
            value,
            error: 'email address is required',
          }
        } else if (
          !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value as string,
          )
        ) {
          data = {
            value,
            error: 'Please input a valid email address',
          }
        } else {
          data = {
            value,
            error: '',
          }
        }
        break
    }

    setForm({
      ...form,
      [key]: data,
    })
  }

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
                  style={stretchedBox}>
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
