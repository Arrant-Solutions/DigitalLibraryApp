import { APP_BASE_URL } from '@env'
import axios from 'axios'
import { GENERIC_SERVER_ERROR } from '../constants/errors'
import { ResponseI } from '../models/response'
import { GenericUserI, UserCredential } from '../models/user'

export const login = async (credential: UserCredential) => {
  try {
    const { status, data } = await axios.post<
      ResponseI<{ token: string; user: GenericUserI }>
    >(`${APP_BASE_URL}/login`, credential)

    if (status === 200) {
      return {
        success: true,
        payload: data.payload
      }
    }

    throw Error('Unknown response')
  } catch (error) {
    const { response } = error

    if (typeof error !== 'undefined') {
      // check error messages
      return {
        success: false,
        payload: 'some string response'
      }
    }

    return {
      success: false,
      payload: GENERIC_SERVER_ERROR
    }
  }
}
