import {
  GENERIC_SERVER_ERROR,
  UNEXPECTED_STATUS_EXCEPTION
} from '../constants/errors'
import { Media } from '../models/media'
import { data } from './data'

export const getCategoryItems = async (categoryID: number) => {
  try {
    // axios.defaults.headers.Authorization = `Client-ID: ${APP_UNSPLASH_ACCESS_KEY}`
    // const { status, data } = await axios.get<{
    //   total: number
    //   total_pages: number
    //   results: Unsplash[]
    // }>(`${APP_UNSPLASH_ACCESS_URL}`)
    // console.log(status, data)

    const status = 200
    // console.log(status)
    if (status === 200) {
      return {
        success: true,
        payload: data.map(
          ({ description, alt_description, urls, user: { name } }) => ({
            title: description || alt_description || name,
            description: description || alt_description || name,
            thumbnail: urls.thumb,
            id: Math.floor(Math.random() * 1000),
            type: 'video',
            duration: Math.floor(Math.random() * 200),
            genre: 'string',
            url: 'local',
            author: 'Pastor Choolwe'
          })
        )
      } as { success: boolean; payload: Media[] }
    }

    throw new Error(UNEXPECTED_STATUS_EXCEPTION)
  } catch (error) {
    console.log(error.response)
    return { success: false, payload: GENERIC_SERVER_ERROR }
  }
}