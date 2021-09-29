import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import {ResponseI} from 'types/Response'
import {GenericUserI} from 'types/User'

export const registerUser = async (
  email: string,
  password: string,
): Promise<ResponseI<string>> => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    )

    await response.user.sendEmailVerification()

    return {statusCode: 200, data: 'User account created & signed in!'}
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        statusCode: 409,
        data: 'That email address is already in use!',
      }
    }

    if (error.code === 'auth/invalid-email') {
      return {
        statusCode: 422,
        data: 'That email address is invalid!',
      }
    }

    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const submitUserDetails = async (
  user: GenericUserI,
): Promise<ResponseI<string>> => {
  try {
    firestore()
      .collection('Users')
      .doc('ABC')
      .update({
        age: 31,
      })
      .then(e => {
        console.log('User updated!', e)
      })

    return {statusCode: 200, data: 'User account created & signed in!'}
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {
        statusCode: 409,
        data: 'That email address is already in use!',
      }
    }

    if (error.code === 'auth/invalid-email') {
      return {
        statusCode: 422,
        data: 'That email address is invalid!',
      }
    }

    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}
