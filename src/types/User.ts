import {BranchI} from './Branch'
import {CountryI} from './Country'
import {GenderI} from './Gender'

export interface GenericUserI {
  avatar?: string
  first_name: string
  last_name: string
  fullname: string
  email: string
  date_of_birth: Date | string
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI
  has_missing?: boolean
}

export type SignupUserI = Omit<GenericUserI, 'branch'>

export type UserCredential = Pick<GenericUserI, 'password' | 'email'>

export type RegularUserI = Omit<GenericUserI, 'password' | 'branch'>

export type GEMemberI = Omit<GenericUserI, 'password' | 'country'>

export class GenericUser implements GenericUserI {
  avatar?: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: Date | string
  country: CountryI
  gender: GenderI
  password: string
  branch: BranchI

  constructor({
    avatar,
    first_name,
    last_name,
    email,
    date_of_birth,
    country,
    gender,
    password,
    branch,
  }: GenericUserI) {
    this.avatar = avatar
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.date_of_birth = Number.isNaN(new Date(date_of_birth).valueOf())
      ? new Date()
      : new Date(date_of_birth)
    this.country = country
    this.gender = gender
    this.password = password
    this.branch = branch
  }

  static createReduxInstance(): GenericUserI {
    return {
      avatar: '',
      first_name: '',
      last_name: '',
      fullname: '',
      email: '',
      date_of_birth: '',
      country: {country_id: 249, country_name: 'Zambia', flag: ''},
      gender: {gender_id: 2, gender_name: 'Female'},
      password: '',
      branch: {branch_id: 0, branch_name: ''},
      has_missing: false,
    }
  }

  get fullname() {
    return `${this.first_name} ${this.last_name}`
  }

  get has_missing(): boolean {
    return !Boolean(
      this.first_name &&
        this.last_name &&
        this.email &&
        this.date_of_birth &&
        this.country &&
        this.gender &&
        this.branch,
    )
  }
}
