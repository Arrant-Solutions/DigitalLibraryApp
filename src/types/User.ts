import {BranchI} from './Branch'
import {CountryI} from './Country'
import {GenderI} from './Gender'
import {UserGroupI} from './userGroup'
import {UserStatusI} from './UserStatus'

export interface GenericUserI {
  avatar?: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: Date | string
  country_id?: number
  country_name?: string
  gender_id?: number
  gender_name?: string
  user_group_id?: string
  user_group_name?: string
  user_status_id?: number
  user_status_name?: string
  password: string
  branch: BranchI

  get has_missing(): boolean | undefined
  get fullname(): string
  get country(): CountryI | undefined
  get gender(): GenderI | undefined
  get user_group(): UserGroupI | undefined
  get user_status(): UserStatusI | undefined
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
  password: string
  country_id?: number
  country_name?: string
  gender_id?: number
  gender_name?: string
  user_group_id?: string
  user_group_name?: string
  user_status_id?: number
  user_status_name?: string
  branch: BranchI

  constructor({
    avatar,
    first_name,
    last_name,
    email,
    date_of_birth,
    country_id,
    country_name,
    gender_id,
    gender_name,
    user_group_id,
    user_group_name,
    user_status_id,
    user_status_name,
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
    this.country_id = country_id
    this.country_name = country_name
    this.gender_id = gender_id
    this.gender_name = gender_name
    this.user_group_id = user_group_id
    this.user_group_name = user_group_name
    this.user_status_id = user_status_id
    this.user_status_name = user_status_name
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
      user_group: {user_group_id: 0, user_group_name: ''},
      user_status: {user_status_id: 0, user_status_name: ''},
      password: '',
      branch: {branch_id: 0, branch_name: ''},
      has_missing: false,
    }
  }

  get fullname() {
    return `${this.first_name} ${this.last_name}`
  }

  get country(): CountryI {
    return {
      country_id: Number(this.country_id),
      country_name: String(this.country_name),
      flag: '',
    }
  }
  get gender(): GenderI {
    return {
      gender_id: Number(this.gender_id),
      gender_name: String(this.gender_name),
    }
  }
  get user_group(): UserGroupI {
    return {
      user_group_id: Number(this.user_group_id),
      user_group_name: String(this.user_group_name),
    }
  }
  get user_status(): UserStatusI {
    return {
      user_status_id: Number(this.user_status_id),
      user_status_name: String(this.user_status_name),
    }
  }

  get has_missing(): boolean {
    return !Boolean(
      this.first_name &&
        this.last_name &&
        this.email &&
        this.date_of_birth &&
        this.country_id &&
        this.gender_id,
    )
  }
}
