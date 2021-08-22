import { APP_COUNTRIES_API } from '@env'
import { fetchData } from '.'
import { CountryI } from '../../models/country'

export const getCountries = async (): Promise<CountryI[]> => {
  const { data } = await fetchData<{ name: string; flag: string }[]>(
    APP_COUNTRIES_API
  )

  if (Array.isArray(data)) {
    return data.map(({ name, flag }, index) => ({
      countryID: index,
      countryName: name,
      flag
    }))
  }

  return []
}
