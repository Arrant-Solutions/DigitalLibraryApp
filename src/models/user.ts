import { BranchI } from './branch'
import { CountryI } from './country'
import { GenderI } from './gender'

export interface GenericUserI {
  avatar?: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI
}

export type SignupUserI = Omit<GenericUserI, 'branch'>

export type UserCredential = Pick<GenericUserI, 'password' | 'email'>

export type RegularUserI = Omit<GenericUserI, 'password' | 'branch'>

export type GEMemberI = Omit<GenericUserI, 'password' | 'country'>

export class GenericUser implements GenericUserI {
  avatar?: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI

  constructor({
    avatar,
    firstName,
    lastName,
    email,
    dateOfBirth,
    country,
    gender,
    password,
    branch
  }: GenericUserI) {
    this.avatar = avatar
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.dateOfBirth = dateOfBirth
    this.country = country
    this.gender = gender
    this.password = password
    this.branch = branch
  }

  static createReduxInstance(): GenericUserI {
    return {
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '' as any,
      country: { countryID: 0, countryName: '' },
      gender: { genderID: 0, genderName: '' },
      password: '',
      branch: { branchID: 0, branchName: '' }
    }
  }
}
