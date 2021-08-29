import SecureStore from 'react-native-sensitive-info'

const storeConfig = {
  sharedPreferencesName: 'GEDigitalLibraryPreference',
  keychainService: 'GEDigitalLibraryKeyChain'
}

export const storeAsyncData = async (key: string, value: any) => {
  try {
    await SecureStore.setItem(key, JSON.stringify(value), storeConfig)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const setAsyncStore = storeAsyncData

export const getAsyncData = async <T = any>(key: string) => {
  try {
    const value = await SecureStore.getItem(key, storeConfig)
    if (value) {
      return JSON.parse(value) as T
    }
  } catch (error) {
    console.log(error)
  }

  return null
}

export const deleteAsyncData = async (key: string) => {
  try {
    await SecureStore.deleteItem(key, storeConfig)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
