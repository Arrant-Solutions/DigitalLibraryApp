import auth from '@react-native-firebase/auth'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import {ResponseI} from 'types/Response'

export const registerUser = async (
  email: string,
  password: string,
): Promise<ResponseI<string>> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password)
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
