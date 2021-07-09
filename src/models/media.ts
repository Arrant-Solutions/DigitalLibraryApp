export interface Media {
  title: string
  type: string
  duration: number
  description: string
  genre: string
  thumbnail: string
}

export type HomeMediaItem = Pick<Media, 'title' | 'thumbnail'>
