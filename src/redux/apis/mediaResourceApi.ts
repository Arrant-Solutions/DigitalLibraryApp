import {APP_BASE_URL} from '@env'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {PCLError} from 'types/PCLException'
import {ResourceItemT} from 'types/Resource'
import {IResourceCategory} from 'types/ResourceCategory'
import {ResponseI} from 'types/Response'

interface MediaResourceI {
  categories: IResourceCategory[]
  media: ResourceItemT[]
}

export const mediaResourceApi = createApi({
  reducerPath: 'resources',
  baseQuery: fetchBaseQuery({baseUrl: APP_BASE_URL}),
  endpoints: build => ({
    getMedia: build.query<MediaResourceI[], void>({
      query: () => '/resources/home',
      transformResponse: ({data}: ResponseI<MediaResourceI[]>) => {
        if (typeof data === 'string') {
          throw new PCLError(data, 999)
        }

        return data
      },
    }),
  }),
})
export const {useGetMediaQuery} = mediaResourceApi
