import { Meta } from './meta'
import { SectionArticle } from '~/types/article'
export interface BaseCategory {
  id: string
  slug: string
  title: string
}
export interface Category extends BaseCategory {
  meta: Meta
  description: string
  status: string
  isDeleted: boolean
  updated: Date
  timestamp: Date
}

export interface CategoryWithArticles extends Category {
  articles: SectionArticle[]
}

export type TCategoriesRecord = Record<string, Category>
