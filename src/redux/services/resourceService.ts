import {APP_BASE_URL} from '@env'
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import firestore from '@react-native-firebase/firestore'
import {FirebaseFieldType, FirebaseQuery} from 'types'
import {BranchI} from 'types/Branch'
import {CountryI} from 'types/Country'
import {GenderI} from 'types/Gender'
import {UserGroupI} from 'types/userGroup'
import {UserStatusI} from 'types/UserStatus'

interface ResourceI {
  countries: CountryI[]
  genders: GenderI[]
  branches: BranchI[]
  userGroups: UserGroupI[]
  userStatuses: UserStatusI[]
}

const firebaseQuery =
  (): BaseQueryFn<
    {
      collection: string
      query?: FirebaseQuery<any>
    },
    any[],
    string
  > =>
  async ({collection, query}) => {
    try {
      const collect = firestore().collection(collection)

      const result = query
        ? await collect
            .where(query.name as FirebaseFieldType, query.operator, query.value)
            .get()
        : await collect.get()

      if (result.empty) {
        return {data: []}
      }

      return {data: result.docs.map(item => item.data())}
    } catch (err) {
      return {
        error: `Unable to fetch ${collection}`,
      }
    }
  }

export const resourceApi = createApi({
  baseQuery: firebaseQuery(),
  endpoints: build => {
    return {
      fetchCountries: build.query<
        CountryI[],
        FirebaseQuery<CountryI> | undefined
      >({
        query: (query?) => ({collection: 'Countries', query}),
      }),
      fetchGenders: build.query<GenderI[], FirebaseQuery<GenderI> | undefined>({
        query: (query?) => ({collection: 'Genders', query}),
      }),
      fetchBranches: build.query<BranchI[], FirebaseQuery<BranchI> | undefined>({
        query: (query?) => ({collection: 'Branches', query}),
      }),
      fetchUserGroups: build.query<
        UserGroupI[],
        FirebaseQuery<UserGroupI> | undefined
      >({
        query: (query?) => ({
          collection: 'UserGroups',
          query: query || {
            name: 'userGroupName',
            operator: '==',
            value: 'Customer',
          },
        }),
      }),
      fetchUserStatuses: build.query<
        UserStatusI[],
        FirebaseQuery<UserStatusI> | undefined
      >({
        query: (query?) => ({
          collection: 'UserStatuses',
          query: query || {
            name: 'userStatusName',
            operator: '==',
            value: 'Pending Activation',
          },
        }),
      }),
      // mutation: build.mutation({
      //   query: () => ({url: '/mutation', method: 'post'}),
      // }),
    }
  },
})

export const {
  useFetchCountriesQuery,
  useFetchGendersQuery,
  useFetchBranchesQuery,
  useFetchUserGroupsQuery,
  useFetchUserStatusesQuery,
} = resourceApi

// const resourcesApi = createApi({
//   baseQuery: fetchBaseQuery({baseUrl: '/ '}),
//   endpoints: build => ({
//     getRandomUserPosts: build.query<ResourceI, void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fisrebaseQuery) {
//         const genders = await firebaseQuery<GenderI>('Genders')

//         return {data: genders}
//       },
//     }),
//   }),
// })