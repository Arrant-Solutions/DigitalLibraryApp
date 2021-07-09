import { APP_UNSPLASH_ACCESS_KEY, APP_UNSPLASH_ACCESS_URL } from '@env'
import axios from 'axios'
import {
  GENERIC_SERVER_ERROR,
  UNEXPECTED_STATUS_EXCEPTION
} from '../constants/errors'
import { HomeMediaItem } from '../models/media'
import { Unsplash } from '../models/unsplash'

export const getLatestReleases = async () => {
  try {
    axios.defaults.headers.AUTHORIZATION = APP_UNSPLASH_ACCESS_KEY
    const { status, data } = await axios.get<{
      total: number
      total_pages: number
      results: Unsplash[]
    }>(`${APP_UNSPLASH_ACCESS_URL}`)

    // console.log(status)
    if (status === 200) {
      return {
        success: true,
        payload: data.results.map(({ description, urls }) => ({
          title: description,
          thumbnail: urls.thumb
        }))
      } as { success: boolean; payload: HomeMediaItem[] }
    }

    throw new Error(UNEXPECTED_STATUS_EXCEPTION)
  } catch (error) {
    return { success: false, payload: GENERIC_SERVER_ERROR }
  }
}
