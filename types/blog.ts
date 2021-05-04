import { Meta } from './meta'

export interface Blog {
  id: string
  meta: Meta
  title: string
  slug: string
  excerpt: string
  content: string
  ping: boolean
  status: string
  isDeleted: boolean
  updated: string
  timestamp: string
  user: string
}
