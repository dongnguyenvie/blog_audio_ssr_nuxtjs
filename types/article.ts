import { recommendData, hashtagData } from '~/mock/seed'
import { Meta } from '~/types/meta'

interface BaseArticle {
  id: string
  title: string
  slug: string
  thumbnail: string
}
export interface IArticle extends BaseArticle {
  meta: Meta
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
export interface SectionArticle extends BaseArticle {
  excerpt: string
  title: string
  blog?: string
  customer?: string
  categories?: string[]
  meta?: Meta
  blog_title: string
  blog_slug: string
}

export interface IWachingArticle extends BaseArticle {
  idWs: string
}

export type TArticles = typeof recommendData.data & IArticle[]
export type TTrendingList = SectionArticle[]
