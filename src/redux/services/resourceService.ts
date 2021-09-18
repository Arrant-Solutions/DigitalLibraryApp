import {APP_BASE_URL} from '@env'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BranchI} from 'models/branch'
import {CountryI} from 'models/country'
import {GenderI} from 'models/gender'

export const countryApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: APP_BASE_URL}),
  endpoints: build => ({
    getCountries: build.query<CountryI[], undefined>({
      query: () => 'country',
    }),
    getCountryById: build.query<CountryI, number>({
      query: id => `country/${id}`,
    }),
  }),
})

export const gendersApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: APP_BASE_URL}),
  endpoints: build => ({
    getGenders: build.query<GenderI[], undefined>({
      query: () => 'gender',
    }),
    getGenderById: build.query<GenderI, number>({
      query: id => `gender/${id}`,
    }),
  }),
})

export const branchesApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: APP_BASE_URL}),
  endpoints: build => ({
    getBranches: build.query<BranchI[], undefined>({
      query: () => 'branch',
    }),
    getBranchById: build.query<BranchI, number>({
      query: id => `branch/${id}`,
    }),
  }),
})

export const {useGetCountriesQuery, useGetCountryByIdQuery} = countryApi
export const {useGetGendersQuery, useGetGenderByIdQuery} = gendersApi
export const {useGetBranchesQuery, useGetBranchByIdQuery} = branchesApi
