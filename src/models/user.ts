import { BranchI } from './branch'
import { CountryI } from './country'
import { GenderI } from './gender'

export interface GenericUserI {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI
}

export type UserCredential = Pick<GenericUserI, 'password' | 'email'>

export type RegularUserI = Exclude<GenericUserI, 'password' | 'branch'>

export type GEMemberI = Exclude<GenericUserI, 'password'>

export class GenericUser implements GenericUserI {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI

  constructor({
    firstName,
    lastName,
    email,
    dateOfBirth,
    country,
    gender,
    password,
    branch
  }: GenericUserI) {
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
