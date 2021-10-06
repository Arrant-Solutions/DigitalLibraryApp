import {IAuthor} from './Author'
import {IMediaType} from './MediaType'
import {IResourceAvailability} from './ResourceAvailability'
import {IResourceCategory} from './ResourceCategory'
import {IResourceType} from './ResourceType'
import {GenericUserI} from './User'

export interface IResource {
  resource_id: number
  title: string
  description: string
  resource_url: string
  thumbnail_url: string
  created_at: Date
  updated_at: Date
}

export type ResourceItemT = IResource &
  IMediaType &
  IResourceAvailability &
  IResourceCategory &
  IResourceType &
  IAuthor &
  GenericUserI
