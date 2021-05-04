import { Blog } from './blog'

export interface User {
  id: string
  last_login: string
  groups: any[]
  user_permissions: any[]
  meta?: any
  blog: Blog
  is_superuser: boolean
  username: string
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
  avatar?: any
  isLogin: boolean
  name: string
}
