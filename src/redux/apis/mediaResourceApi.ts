import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import {fetchData} from 'redux/services'
import {ResourceItemT} from 'types/Resource'
import {IResourceCategory} from 'types/ResourceCategory'

interface MediaResourceI {
  categories: IResourceCategory[]
  media: ResourceItemT[]
}

const axiosQuery =
  (): BaseQueryFn<
    {
      url: string
    },
    any[],
    string
  > =>
  async ({url}) => {
    try {
      const {data} = await fetchData<ResourceItemT[]>(url)
      console.log(url, data)

      if (typeof data === 'object') {
        return {data}
      }

      throw new Error(data)
    } catch (err) {
      console.log('wwwwww', err)
      return {
        error: String(err),
      }
    }
  }

export const mediaResourceApi = createApi({
  reducerPath: 'media',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: APP_BASE_URL,
  //   prepareHeaders: async (headers, {getState}) => {
  //     const auth = await getAsyncData<AuthSliceI>(Storage.AUTH_STORAGE)

  //     if (auth) {
  //       headers.set('authorization', `Bearer: ${auth.token}`)
  //     }

  //     console.log(headers)

  //     return headers
  //   },
  // }),
  baseQuery: axiosQuery(),
  endpoints: build => ({
    getMedia: build.query<ResourceItemT[], void>({
      query: () => ({url: '/resources/home'}),
    }),
  }),
})
export const {useGetMediaQuery} = mediaResourceApi
