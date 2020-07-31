import { IMeta } from './meta'
import { ISectionArticle } from '~/types/article'
export interface IBaseCategory {
  id: string
  slug: string
  title: string
}
export interface ICategory extends IBaseCategory {
  meta: IMeta
  description: string
  status: string
  isDeleted: boolean
  updated: Date
  timestamp: Date
}

export interface ICategoryWithArticles extends ICategory {
  articles: ISectionArticle[]
}

export type TCategoriesRecord = Record<string, ICategory>
