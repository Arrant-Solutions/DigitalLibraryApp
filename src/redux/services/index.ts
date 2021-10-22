import {APP_BASE_URL} from '@env'
import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {UNEXPECTED_STATUS_EXCEPTION} from '../../constants/errors'
import {ResponseI} from '../../types/Response'

axios.defaults.baseURL = APP_BASE_URL

console.log(APP_BASE_URL)

// Add a request interceptor
// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     console.log(config.baseURL, config.url, config.method)

//     return config
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error)
//   },
// )

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log(response.config.url)
//     return response
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error)
//   },
// )

export const postData = async <T = unknown, P = unknown>(
  url: string,
  payload: P,
  config?: AxiosRequestConfig,
) => {
  try {
    const {data} = await axios.post<ResponseI<T>>(url, payload, config)

    return data
  } catch (error) {
    console.log(error)
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
    const {data} = await axios.put<ResponseI<T>>(url, payload)

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
    const {data} = await axios.patch<ResponseI<T>>(url, payload)

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
    const {data} = await axios.get<ResponseI<T>>(url, params)

    return data
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>

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

export const deleteData = async <T = unknown, B = unknown>(
  url: string,
  params?: B,
) => {
  try {
    const {data} = await axios.delete<ResponseI<T>>(url, params)

    return data
  } catch (error) {
    const {response} = error as AxiosError<ResponseI<T>>

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
