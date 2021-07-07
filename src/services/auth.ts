import { APP_BASE_URL } from '@env'
import axios from 'axios'
import { GENERIC_SERVER_ERROR } from '../constants/errors'
import { ResponseI } from '../models/response'
import { GenericUserI, UserCredential } from '../models/user'

export const login = async (credential: UserCredential) => {
  try {
    return {
      success: true,
      payload: {
        // statusCode?
        user: {
          firstName: 'Pablo',
          lastName: 'Miyuru',
          username: 'sg1290',
          email: 'Pablo.Miyuru@domain.co.zm',
          dateOfBirth: '1990-10-31',
          gender: {
            genderID: 1,
            genderName: 'Male'
          },
          country: {
            countryID: 1,
            countryName: 'Angola'
          },
          branch: {
            branchID: 1,
            branchName: 'Chadleigh Branch'
          }
        },
        token:
          'eyJhbGciOixhc3RfbmFtZSI6Ik1JIUzI1J9.eyJmaXJzdF9uYW1lIjoiV2lsbGlhbSIsImvb25nYSIsInVzZXJuYW1lIjoiZ24xMzc2IiwiZW1haWwiOnsidmFsdWUiOiJXaWxsaWFtLk1vb25nYUB6YW10ZWwuY28uem0ifSwidXNlcl9sZXZlbCI6ImFkbWluIiwiYnVsa3Ntc19hZG1pbiI6dHJ1ZSwiNiIsInR5cCI6IkpXVCc3RhdHVzIjoxLCJpYXQiOjE2MDY3MjUzMzQsImV4cCI6MTYwNjc1NDEzNCwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDAwIn0.mTCIL3ImkMat2q4LiVfQF-LzQKxGPjpY8vRPZtyLhQQ'
        // }
      }
    }
    const { status, data } = await axios.post<
      ResponseI<{ token: string; user: GenericUserI }>
    >(`${APP_BASE_URL}/login`, credential)
    console.log(data)

    if (status === 200) {
      return {
        success: true,
        payload: data.payload
      }
    }

    throw Error('Unknown response')
  } catch (error) {
    console.log(error)
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
