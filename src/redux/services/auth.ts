import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {appleAuth} from '@invertase/react-native-apple-authentication'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import {GENERIC_SERVER_ERROR, LOGIN_FAILURE} from 'constants/errors'
import {ResponseI} from 'types/Response'
import {GenericUserI} from 'types/User'
import {fetchData, postData} from '.'

GoogleSignin.configure({
  webClientId:
    '1078867846949-9k6qcvbngjchvgc7mcdem30c2m5ql6je.apps.googleusercontent.com',
})

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

      return response
    }

    return {statusCode, data: data as string} // always a string here
  } catch (error) {
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

    return {statusCode, data}
  } catch (error: any) {
    return {statusCode: 500, data: GENERIC_SERVER_ERROR}
  }
}

export const appleSignIn = async (): Promise<
  ResponseI<{
    credential: FirebaseAuthTypes.UserCredential
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
      return {
        data: {
          credential: response,
          user: data.user,
          token: data.token,
        },
        statusCode,
      }
    }

    return {
      statusCode: 200,
      data: {
        credential: response,
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
    credential: FirebaseAuthTypes.UserCredential
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
      return {
        data: {
          credential: response,
          user: serverData.user,
          token: serverData.token,
        },
        statusCode,
      }
    }

    const names = (displayName || '').split('')

    return {
      statusCode: 200,
      data: {
        credential: response,
        user: {
          email,
          first_name: names.length ? names[0] : '',
          last_name: names.length > 1 ? names[1] : '',
          avatar: String(photoURL),
        },
      },
    }
  } catch (error: any) {
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
    credential: FirebaseAuthTypes.UserCredential
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
      return {
        data: {
          credential,
          user: serverData.user,
          token: serverData.token,
        },
        statusCode,
      }
    }

    const names = (displayName || '').split('')

    return {
      statusCode: 200,
      data: {
        credential,
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
