import axios, { AxiosResponse } from 'axios'
import { UNEXPECTED_STATUS_EXCEPTION } from '../../constants/errors'
import { ResponseI } from '../../models/response'

export const postData = async <T = unknown, P = unknown>(
  url: string,
  payload: P
) => {
  try {
    const { data } = await axios.post<ResponseI<T>>(url, payload)

    return data
  } catch (error) {
    // console.log(error.response instanceof AxiosResponse)
    if (typeof error.response === 'object') {
      const { data } = error.response as AxiosResponse<ResponseI<T>>

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return { statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION }
  }
}

export const putData = async <T = unknown, P = unknown>(
  url: string,
  payload: P
) => {
  try {
    const { data } = await axios.put<ResponseI<T>>(url, payload)

    return data
  } catch (error) {
    // console.log(error.response instanceof AxiosResponse)
    if (typeof error.response === 'object') {
      const { data } = error.response as AxiosResponse<ResponseI<T>>

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return { statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION }
  }
}

export const patchData = async <T = unknown, P = unknown>(
  url: string,
  payload: P
) => {
  try {
    const { data } = await axios.patch<ResponseI<T>>(url, payload)

    return data
  } catch (error) {
    // console.log(error.response instanceof AxiosResponse)
    if (typeof error.response === 'object') {
      const { data } = error.response as AxiosResponse<ResponseI<T>>

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return { statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION }
  }
}

export const fetchData = async <T = unknown, P = unknown>(
  url: string,
  params?: P
) => {
  try {
    const { data } = await axios.get<ResponseI<T>>(url, params)

    return data
  } catch (error) {
    // console.log(error.response instanceof AxiosResponse)
    if (typeof error.response === 'object') {
      const { data } = error.response as AxiosResponse<ResponseI<T>>

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return { statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION }
  }
}
