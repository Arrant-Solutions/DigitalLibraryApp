import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {appleAuth} from '@invertase/react-native-apple-authentication'
import {GENERIC_SERVER_ERROR} from 'constants/errors'
import {ResponseI} from 'types/Response'
import {GenericUser, GenericUserI} from 'types/User'
import axios from 'axios'
import {fetchData} from '.'
import {PCLError} from 'types/PCLException'

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

export const appleSignIn = async (): Promise<
  ResponseI<{
    credential: FirebaseAuthTypes.UserCredential
    user: Pick<GenericUser, 'email' | 'firstName' | 'lastName'> | GenericUser
  }>
> => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned'
    }
    // console.log('no exception')
    // console.log(JSON.stringify(appleAuthRequestResponse, null, 2))

    const {email, fullName} = appleAuthRequestResponse
    // console.log(JSON.stringify({email, fullName}, null, 2))

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    // Sign the user in with the credential
    const response = await auth().signInWithCredential(appleCredential)

    if (email) {
      const {data, statusCode} = await fetchData<GenericUserI>(
        `/auth/fetchUser/${email}`,
      )

      if (statusCode === 200 && typeof data === 'object') {
        return {
          data: {
            credential: response,
            user: new GenericUser(data),
          },
          statusCode,
        }
      }

      throw new PCLError('Failed to fetch user', 500)
    }

    return {
      statusCode: 200,
      data: {
        credential: response,
        user: {
          email: String(email),
          firstName: String(fullName?.givenName),
          lastName: String(fullName?.familyName),
        },
      },
    }
  } catch (error) {
    const {code} = error as any
    if (code === '1001') {
      return {
        statusCode: 401,
        data: 'Login failed. Please use your AppleID to login.',
      }
    }

    if (code === 500) {
      return {
        statusCode: 500,
        data: 'An internal error occurred while validating your user details. Please try again later.',
      }
    }

    return {
      statusCode: 500,
      data: 'Failed to login. An error occurred please try again later.',
    }
  }
}
