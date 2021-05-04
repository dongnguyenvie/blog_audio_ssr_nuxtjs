import { PAGE_SIZE_DEFAULT } from '~/utils/contants'
import { isArray } from 'lodash'

export enum ModelKeyNm {
  categories = 'cagegories',
  category = 'category',
  blog = 'blog',
  tags = 'tags',
  tag = 'tag',
  id = 'id',
  view = 'view',
  isDeleted = 'isDeleted',
  has_category = 'has_category',
  slug = 'slug',
  article = 'article',
}

// @Mapping https://docs.djangoproject.com/en/3.0/topics/db/queries/
class GenerateLookup {
  _prefixLookup = '__'
  _lookup_expr_type = {
    exact: '',
    iexact: 'iexact',
    contains: 'contains',
    icontains: 'icontains',
    in: 'in',
    gt: 'gt',
    gte: 'gte',
    lt: 'lt',
    lte: 'lte',
    startswith: 'startswith',
    istartswith: 'istartswith',
    endswith: 'endswith',
    iendswith: 'iendswith',
    range: 'range',
    date: 'date',
    year: 'year',
    isnull: 'isnull',
    equal: '',
  }

  /**
   * @description format url is tag__id__in=uuid1,uuid2,... === (SELECT ... WHERE tag IN ('uuid1', 'uuid2')
   * @param modelKeylNm
   * @param valCompare {String[]} auto genrate lookup ['tag', 'id'] => tag__id
   */
  public in(modelKeylNm: (keyof typeof ModelKeyNm)[], valCompare: string | string[] | boolean) {
    return this.joinQuery(modelKeylNm, this._lookup_expr_type.in, valCompare)
  }

  /**
   *
   * @description format url is tag__id=uuid == (SELECT ... WHERE id = uuid;)
   * @param modelKeylNm
   * @param valCompare {String[]} auto genrate lookup ['tag', 'id'] => tag__id
   */
  public exact(modelKeylNm: (keyof typeof ModelKeyNm)[], valCompare: string | string[] | boolean) {
    return this.joinQuery(modelKeylNm, this._lookup_expr_type.exact, valCompare)
  }

  public equal(modelKeylNm: (keyof typeof ModelKeyNm)[], valCompare: string | string[] | boolean) {
    return this.joinQuery(modelKeylNm, this._lookup_expr_type.equal, valCompare)
  }

  public joinQuery(modelKeylNm: (keyof typeof ModelKeyNm)[], lookupType: string, valCompare: string | string[] | boolean) {
    const clauseA = lookupType ? modelKeylNm.join(this._prefixLookup) + this._prefixLookup + lookupType : modelKeylNm.join(this._prefixLookup)
    const clauseB = isArray(valCompare) ? valCompare.join(',') : valCompare
    return { [clauseA]: clauseB }
  }
}

export const generateLookup = new GenerateLookup()

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
  ...generateLookup.exact(['isDeleted'], false),
}

export const defaultFields = (fields = 'id,slug,title,excerpt,thumbnail') => ({
  fields: fields,
})

export const uncategories = (flg = false) => ({
  uncategories: flg,
})
