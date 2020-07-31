import { PAGE_SIZE_DEFAULT } from '~/utils/contants'
import { isArray } from 'lodash'

export const pagination = (pageSize = PAGE_SIZE_DEFAULT, currentPage = 1) => ({
  page_size: pageSize,
  page: currentPage,
})

export const orderingTopView = {
  ordering: '-meta__view',
}

export const orderingRandom = {
  ordering: '?',
}

export const orderingCreatedAt = {
  ordering: '-timestamp',
}

export const activeRecord = {
  isDeleted: false,
}

export const defaultFields = (fields = 'id,slug,title,excerpt,thumbnail') => ({
  fields: fields,
})

export const uncategories = (flg = false) => ({
  uncategories: flg,
})

export const categories = (categories: string | string[]) => ({
  categories: categories,
})

export const tags = (tags: string | string[]) => ({
  tags: tags,
})

export const generateParams = (queryParams: any = {}): URLSearchParams => {
  let params = new URLSearchParams()
  Object.keys(queryParams).forEach((keyParam) => {
    const valueOrParams = queryParams[keyParam]
    if (isArray(valueOrParams)) {
      valueOrParams.forEach((value) => {
        params.append(keyParam, value)
      })
    } else {
      params.append(keyParam, valueOrParams)
    }
  })
  return params
}
