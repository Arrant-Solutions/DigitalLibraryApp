import { categories } from './data'

export const fetchCategories = async () => {
  return {
    success: true,
    payload: categories
  }
}
