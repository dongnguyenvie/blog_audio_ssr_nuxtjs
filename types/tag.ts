export interface ITag {
  id: string
  title: string
  content: string
  isDeleted: boolean
  updated: Date
  timestamp: Date
  meta: string
}

export type TTag = ITag
export type THashtag = ITag[]
