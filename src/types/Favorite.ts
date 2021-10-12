import {IAuthor} from './Author'
import {IMediaType} from './MediaType'
import {IResource} from './Resource'
import {IResourceAvailability} from './ResourceAvailability'
import {IResourceCategory} from './ResourceCategory'
import {IResourceType} from './ResourceType'
import {GenericUserI} from './User'

export interface IFavorite {
  favorite_id: number
  user_id: number
  resource_id: number
  created_at: Date
  updated_at: Date
}

export type FavoriteCreateT = Pick<IFavorite, 'user_id' | 'resource_id'> &
  Partial<Pick<IFavorite, 'favorite_id'>>

export type FavoriteItemT = IFavorite &
  IResource &
  IMediaType &
  IResourceAvailability &
  IResourceCategory &
  IResourceType &
  IAuthor &
  GenericUserI
