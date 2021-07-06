import { APP_COUNTRIES_API } from '@env'
import axios from 'axios'
import {
  GENERIC_SERVER_ERROR,
  UNEXPECTED_STATUS_EXCEPTION
} from '../constants/errors'
import { CountryI } from '../models/country'
import { ResponseI } from '../models/response'

// https://restcountries.eu/rest/v2/all
export const getCountries = async () => {
  try {
    const { status, data } = await axios.get<any[]>(`${APP_COUNTRIES_API}`)

    // console.log(status)
    if (status === 200) {
      return {
        success: true,
        payload: data.map(({ name }, index) => ({
          countryID: index,
          countryName: name
        }))
      } as { success: boolean; payload: CountryI[] }
    }

    throw new Error(UNEXPECTED_STATUS_EXCEPTION)
  } catch (error) {
    return { success: false, payload: GENERIC_SERVER_ERROR }
  }
}

export const getGenders = () => {
  try {
    return {
      success: false,
      payload: [
        { genderName: 'Male', genderID: 1 },
        { genderName: 'Female', genderID: 2 }
      ]
    }
  } catch (error) {
    return { success: false, payload: GENERIC_SERVER_ERROR }
  }
}
