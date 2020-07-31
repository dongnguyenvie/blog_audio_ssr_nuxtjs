import { recommendData, hashtagData } from '~/mock/seed'
import { IMeta } from '~/types/meta'

interface IBaseArticle {
  id: string
  title: string
  slug: string
  thumbnail: string
}
export interface IArticle extends IBaseArticle {
  meta: IMeta
  id_audio: string
  blog: string
  excerpt: string
  content: string
  resource: string
  ping: boolean
  type: number
  status: string
  isDeleted: boolean
  updated: Date
  timestamp: Date
  customer?: any
  tags: any[]
  categories: string[]
}
export interface ISectionArticle extends IBaseArticle {
  excerpt: string
  title: string
  blog?: string
  customer?: string
  categories?: string[]
  meta?: IMeta
}

export interface IWachingArticle extends IBaseArticle {
  idWs: string
}

export type TArticles = typeof recommendData.data & IArticle[]
export type TTrendingList = ISectionArticle[]
