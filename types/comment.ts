export interface Comment {
  id: string
  parrentId?: any
  isDeleted: boolean
  user: string
  view: number
  like: number
  content: string
  updated: string
  timestamp: string
  article: string
  article_thumbnail: string
  article_slug: string
}
