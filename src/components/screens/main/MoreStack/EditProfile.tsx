import Header from 'components/screens/common/Header'
import PCLButton from 'components/screens/common/PCLButton'
import {pcl} from 'components/screens/common/style'
import React, {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Avatar, Input} from 'react-native-elements'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {useAppSelector} from 'redux/hooks'
import {selectAuth} from 'redux/slices/authSlice'

const EditProfile = () => {
  const {user} = useAppSelector(selectAuth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, setState] = useState({
    first_name: {value: '', error: false},
    last_name: {value: '', error: false},
  })

  const handleChange = (key: 'first_name' | 'last_name', value: string) =>
    setState({
      ...state,
      [key]: {
        value,
        error: !/^(?!.*([A-Za-z0-9])\1{2})[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(
          value,
        ),
      },
    })

  const handleSubmit = () => {}

  return (
    <View style={{flex: 1}}>
      <Header back title="Edit Profile" showActionButtons={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          containerStyle={{
            marginBottom: 20,
            backgroundColor: `${pcl.gold}40`,
            padding: 1,
            alignSelf: 'center',
          }}
          rounded
          size={120}
          title={`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
          source={{
            uri: user.avatar,
          }}>
          <Avatar.Accessory size={40} tvParallaxProperties={undefined} />
        </Avatar>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          labelStyle={styles.textStyle}
          placeholderTextColor={pcl.textPlaceholder}
          errorMessage={
            state.first_name.error ? 'Please input a valid first name' : ''
          }
          errorStyle={state.first_name.error ? styles.inputErrorStyle : {}}
          placeholder="First Name"
          leftIcon={
            <SimpleLineIcons
              name="user"
              size={20}
              color={pcl.textPlaceholder}
            />
          }
          onChangeText={value => handleChange('first_name', value)}
          value={state.first_name.value}
          multiline={false}
        />
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          errorStyle={state.first_name.error ? styles.inputErrorStyle : {}}
          labelStyle={styles.textStyle}
          placeholderTextColor={pcl.textPlaceholder}
          errorMessage={
            state.last_name.error ? 'Please input a valid last name' : ''
          }
          placeholder="Last Name"
          leftIcon={
            <SimpleLineIcons
              name="user"
              size={20}
              color={pcl.textPlaceholder}
            />
          }
          onChangeText={value => handleChange('last_name', value)}
          value={state.last_name.value}
          multiline={false}
        />

        <PCLButton
          containerStyle={{width: '100%'}}
          loading={isSubmitting}
          disabled={state.first_name.error || state.last_name.error}
          title="Register"
          onPress={handleSubmit}
        />
      </ScrollView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
})
