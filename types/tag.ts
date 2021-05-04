export interface Tag {
  id: string
  title: string
  content: string
  isDeleted: boolean
  updated: Date
  timestamp: Date
  meta: string
}

export type TTag = Tag
export type THashtag = Tag[]
