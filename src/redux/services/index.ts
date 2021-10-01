import axios, {AxiosResponse, AxiosError} from 'axios'
import {UNEXPECTED_STATUS_EXCEPTION} from '../../constants/errors'
import {ResponseI} from '../../types/Response'

export const postData = async <T = unknown, P = unknown>(
  url: string,
  payload: P,
) => {
  try {
    const {data} = await axios.post<T>(url, payload)

    return data
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>
    // console.log(error.response instanceof AxiosResponse)
    if (typeof response === 'object') {
      const {data} = response

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return {statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION}
  }
}

export const putData = async <T = unknown, P = unknown>(
  url: string,
  payload: P,
) => {
  try {
    const {data} = await axios.put<T>(url, payload)

    return data
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>
    // console.log(error.response instanceof AxiosResponse)
    if (typeof response === 'object') {
      const {data} = response

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return {statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION}
  }
}

export const patchData = async <T = unknown, P = unknown>(
  url: string,
  payload: P,
) => {
  try {
    const {data} = await axios.patch<T>(url, payload)

    return data
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>
    // console.log(error.response instanceof AxiosResponse)
    if (typeof response === 'object') {
      const {data} = response

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return {statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION}
  }
}

export const fetchData = async <T = unknown, B = unknown>(
  url: string,
  params?: B,
) => {
  try {
    const {status, data} = await axios.get<T>(url, params)

    return {statusCode: status, data}
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>
    // console.log(error.response instanceof AxiosResponse)
    if (typeof response === 'object') {
      const {data} = response

      if (
        typeof data === 'object' &&
        typeof data.statusCode !== 'undefined' &&
        typeof data.data !== 'undefined'
      )
        return data
    }

    return {statusCode: 500, data: UNEXPECTED_STATUS_EXCEPTION}
  }
}
