import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {appleAuth} from '@invertase/react-native-apple-authentication'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import {GENERIC_SERVER_ERROR, LOGIN_FAILURE} from 'constants/errors'
import {ResponseI} from 'types/Response'
import {GenericUserI, UserCredential} from 'types/User'
import {fetchData, postData} from '.'
import axios from 'axios'
import {IFbCredential} from 'types'

GoogleSignin.configure({
  webClientId:
    '1078867846949-9k6qcvbngjchvgc7mcdem30c2m5ql6je.apps.googleusercontent.com',
})

export const requestPasswordReset = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email)

    return {
      statusCode: 200,
      data: 'A password reset email has been sent. Check your email to complete the reset process.',
    }
  } catch (error) {
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError

    if (code === 'auth/user-not-found') {
      return {
        statusCode: 404,
        data: 'User with specified email do not exist or you signed in with Apple, Google or Facebook.',
      }
    }

    if (code === 'auth/invalid-email') {
      return {statusCode: 422, data: 'Invalid email address'}
    }

    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const resetPassword = async (password: string, code: string) => {
  try {
    await auth().confirmPasswordReset(code, password)

    return {statusCode: 200, data: 'You password has been reset successfully'}
  } catch (error) {
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError

    if (code === 'auth/user-not-found') {
      return {statusCode: 404, data: 'User with specified email do not exist'}
    }

    if (code === 'auth/expired-action-code') {
      return {statusCode: 422, data: 'Invalid email address'}
    }

    if (code === 'auth/invalid-action-code') {
      return {statusCode: 422, data: 'Invalid password reset code'}
    }

    if (code === 'auth/user-disabled') {
      return {statusCode: 422, data: 'Your user account has been disabled'}
    }

    if (code === 'auth/weak-password') {
      return {
        statusCode: 422,
        data: 'Password should contain at least 1 uppercase letter, 1 number, 1 special character & should be at least 8 characters long',
      }
    }

    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const emailPasswordSignup = async (
  email: string,
  password: string,
): Promise<ResponseI<FirebaseAuthTypes.UserCredential>> => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    )

    await response.user.sendEmailVerification()

    return {statusCode: 200, data: response}
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

    return {statusCode: 500, data: LOGIN_FAILURE}
  }
}

export const emailRegistration = async (
  user: Pick<
    GenericUserI,
    'first_name' | 'last_name' | 'date_of_birth' | 'email' | 'password'
  > & {gender_id: number; country_id: number; branch_id: number},
): Promise<ResponseI<{user: GenericUserI; token: string}>> => {
  try {
    const {data, statusCode} = await emailPasswordSignup(
      user.email,
      user.password,
    )

    if (statusCode === 409 || statusCode === 200) {
      const response = await submitUserDetails(user)

      if (typeof response.data === 'object') {
        axios.defaults.headers.common.authorization = `Bearer ${response.data.token}`
      }

      return response
    }

    return {statusCode, data: data as string} // always a string here
  } catch (error) {
    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const emailPasswordLogin = async ({email, password}: UserCredential) => {
  try {
    const credential = await auth().signInWithEmailAndPassword(
      email.toLocaleLowerCase(),
      password,
    )

    // console.log(JSON.stringify(credential, null, 2), 'xxxxxxxxxxx')

    if (credential.user) {
      return {
        statusCode: 200,
        data: {
          refreshToken: '',
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
        },
      }
    }

    return {statusCode: 401, data: 'Failed to login'}
  } catch (error) {
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError

    if (code === 'auth/user-not-found') {
      return {
        statusCode: 404,
        data: 'User with specified email does not exists',
      }
    }

    if (code === 'auth/wrong-password') {
      return {
        statusCode: 401,
        data: 'Invalid email/password combination',
      }
    }

    if (code === 'auth/too-many-requests') {
      return {
        statusCode: 401,
        data: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
      }
    }

    if (code === 'auth/invalid-email') {
      return {
        statusCode: 422,
        data: 'Please input a valid email address',
      }
    }

    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const submitUserDetails = async (
  user: Pick<
    GenericUserI,
    'first_name' | 'last_name' | 'date_of_birth' | 'email'
  > & {gender_id: number; country_id: number; branch_id: number},
): Promise<ResponseI<{user: GenericUserI; token: string}>> => {
  try {
    const {statusCode, data} = await postData<{
      user: GenericUserI
      token: string
    }>('/auth/register', user)

    if (typeof data === 'object') {
      axios.defaults.headers.common.authorization = `Bearer ${data.token}`
    }

    return {statusCode, data}
  } catch (error: any) {
    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const appleSignIn = async (): Promise<
  ResponseI<{
    credential: IFbCredential
    user:
      | Pick<GenericUserI, 'email' | 'first_name' | 'last_name' | 'avatar'>
      | GenericUserI
    token?: string
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

    if (!email || email === 'null') {
      return {
        statusCode: 401,
        data: 'Your email address is required to complete the registration proces.',
      }
    }

    // Sign the user in with the credential
    const response = await auth().signInWithCredential(appleCredential)

    const {data, statusCode} = await fetchData<{
      user: GenericUserI
      token: string
    }>(`/auth/fetchUser/${email}`)

    if (typeof data === 'object') {
      axios.defaults.headers.common.authorization = `Bearer ${data.token}`

      return {
        data: {
          credential: {
            refreshToken: '',
            uid: response.user.uid,
          },
          user: data.user,
          token: data.token,
        },
        statusCode,
      }
    }

    return {
      statusCode: 200,
      data: {
        credential: {
          refreshToken: '',
          uid: response.user.uid,
        },
        user: {
          email: String(email),
          first_name:
            String(fullName?.givenName) || String(fullName?.familyName),
          last_name:
            String(fullName?.familyName) || String(fullName?.givenName),
          avatar: '',
        },
      },
    }
  } catch (error) {
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError
    if (code === '1001') {
      return {
        statusCode: 401,
        data: 'Login failed. Please use your AppleID to login.',
      }
    }

    return {
      statusCode: 500,
      data: LOGIN_FAILURE,
    }
  }
}

export const facebookAuth = async (): Promise<
  ResponseI<{
    credential: IFbCredential
    user:
      | Pick<GenericUserI, 'email' | 'first_name' | 'last_name' | 'avatar'>
      | GenericUserI
    token?: string
  }>
> => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])

    if (result.isCancelled) {
      throw 'User cancelled the login process'
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
      throw 'Something went wrong obtaining access token'
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    )

    // Sign-in the user with the credential
    const response = await auth().signInWithCredential(facebookCredential)

    // console.log(JSON.stringify(response, null, 2))

    const {
      user: {email, displayName, photoURL},
    } = response

    if (!email || email === 'null') {
      return {
        statusCode: 401,
        data: 'Your email address is required to complete the registration proces.',
      }
    }

    const {data: serverData, statusCode} = await fetchData<{
      user: GenericUserI
      token: string
    }>(`/auth/fetchUser/${email}`)

    if (typeof serverData === 'object') {
      axios.defaults.headers.common.authorization = `Bearer ${serverData.token}`

      return {
        data: {
          credential: {
            refreshToken: '',
            uid: response.user.uid,
          },
          user: serverData.user,
          token: serverData.token,
        },
        statusCode,
      }
    }

    const names = (displayName || '').split(' ')
    console.log(names)

    return {
      statusCode: 200,
      data: {
        credential: {
          refreshToken: '',
          uid: response.user.uid,
        },
        user: {
          email,
          first_name: names.length ? names[0] : '',
          last_name: names.length > 1 ? names[1] : '',
          avatar: String(photoURL),
        },
      },
    }
  } catch (error: any) {
    console.log(error)
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError

    if (code === 'auth/account-exists-with-different-credential') {
      return {
        statusCode: 401,
        data: 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
      }
    }

    return {
      statusCode: 500,
      data: LOGIN_FAILURE,
    }
  }
}

export const googleAuth = async (): Promise<
  ResponseI<{
    credential: IFbCredential
    user:
      | Pick<GenericUserI, 'email' | 'first_name' | 'last_name' | 'avatar'>
      | GenericUserI
    token?: string
  }>
> => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const credential = await auth().signInWithCredential(googleCredential)

    const {email, photoURL, displayName} = credential.user

    if (!email || email === 'null') {
      return {
        statusCode: 401,
        data: 'Your email address is required to complete the registration proces.',
      }
    }

    const {data: serverData, statusCode} = await fetchData<{
      user: GenericUserI
      token: string
    }>(`/auth/fetchUser/${email}`)

    if (typeof serverData === 'object') {
      axios.defaults.headers.common.authorization = `Bearer ${serverData.token}`

      return {
        data: {
          credential: {
            refreshToken: '',
            uid: credential.user.uid,
          },
          user: serverData.user,
          token: serverData.token,
        },
        statusCode,
      }
    }

    const names = (displayName || '').split(' ')

    return {
      statusCode: 200,
      data: {
        credential: {
          refreshToken: '',
          uid: credential.user.uid,
        },
        user: {
          email,
          first_name: names.length ? names[0] : '',
          last_name: names.length > 1 ? names[1] : '',
          avatar: String(photoURL),
        },
      },
    }
  } catch (error) {
    const {code} = error as FirebaseAuthTypes.NativeFirebaseAuthError

    if (code === 'auth/account-exists-with-different-credential') {
      return {
        statusCode: 401,
        data: 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
      }
    }

    return {statusCode: 500, data: LOGIN_FAILURE}
  }
}
