export interface Media {
  id: number
  title: string
  type: string
  duration: number
  description: string
  genre: string
  thumbnail: string
  url: string
  author: string
}

export type HomeMediaItem = Pick<Media, 'title' | 'thumbnail'>
