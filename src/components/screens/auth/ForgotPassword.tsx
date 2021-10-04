import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {AuthStackParamList} from 'components/MainNavigation'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import React, {useState} from 'react'
import {Alert, StyleSheet, Text, View} from 'react-native'
import {Input} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {requestPasswordReset} from 'redux/services/auth'
import GlassyCard from '../common/GlassyCard'
import ModalLoader from '../common/ModalLoader'
import PCLButton from '../common/PCLButton'
import SocialAuth from '../common/SocialAuth'
import {flexColumn, pcl} from '../common/style'

type NavProp = StackNavigationProp<AuthStackParamList, 'Login'>

const ForgotPassword = () => {
  const {navigate} = useNavigation<NavProp>()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleResetRequest = async () => {
    setLoading(true)
    requestPasswordReset(email)
      .then(({data, statusCode}) => {
        if (statusCode === 200) {
          Alert.alert('Success', data, [
            {text: 'Continue', onPress: () => navigate('Login')},
          ])
        } else {
          Alert.alert('Reset Failed', data)
        }
      })
      .catch(() => {
        Alert.alert('Reset Failed', GENERIC_SERVER_ERROR)
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <GlassyCard
        title="Forgot Password"
        showActionButtons={false}
        showBack
        backgroundColor={pcl.purple}
        barStyle="light-content"
        blurAmount={0}
        solidContainerStyle={{backgroundColor: pcl.background, padding: 20}}
        cardContainerStyle={{padding: 20, paddingVertical: 30}}
        colors={[pcl.background, pcl.background]}
        containerStyle={{height: 300}}>
        <SocialAuth setLoading={setLoading} />
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          placeholderTextColor={pcl.textPlaceholder}
          placeholder="Email"
          leftIcon={
            <Ionicons
              name="mail-outline"
              size={20}
              color={pcl.textPlaceholder}
            />
          }
          onChangeText={setEmail}
          value={email}
          multiline={false}
        />
        <View style={[flexColumn, {width: '100%'}]}>
          <PCLButton
            titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#000b'}}
            loading={loading}
            title="Request Reset"
            onPress={handleResetRequest}
          />
        </View>
        <ModalLoader transparent={true} visible={loading} />
      </GlassyCard>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    borderColor: pcl.textPlaceholder,
    borderBottomWidth: 1 / 2,
  },
})
