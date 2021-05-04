import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SERVER_API, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { ARTICLE_MODULE } from '~/types/store'

export const state = () => ({})

export const actions: ActionTree<any, any> = {
  async [ARTICLE_MODULE.actionFetchArticleWithSlug]({ commit }, slug) {
    try {
      let articleDetail = await requestAPI.get(SERVER_API.articleWithSlug + slug + '/')
      return articleDetail
    } catch (error) {
      return false
    }
  },
  async [ARTICLE_MODULE.actionFetchArticleWithListID]({ commit }, ids: string | string[]) {
    try {
      let articlesData = await requestAPI.get(SERVER_API.article, {
        params: {
          ...params.activeRecord,
          ...params.pagination(12),
          ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
          ...(ids.length ? params.generateLookup.in(['id'], ids) : {}),
        },
      })
      return articlesData.results
    } catch (error) {
      return false
    }
  },
  async [ARTICLE_MODULE.actionFetchRandomArticleData]({ commit, rootGetters, state, rootState }) {
    let randomData = await requestAPI.get(SERVER_API.article, {
      params: {
        ...params.activeRecord,
        ...params.pagination(12),
        ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
        ...params.generateLookup.equal(['has_category'], true),
      },
    })
    return randomData.results
  },
  async [ARTICLE_MODULE.actionFetchRandomArticleDataWithCategories]({ commit, rootGetters, state, rootState }, categories) {
    let randomData = await requestAPI.get(SERVER_API.article, {
      params: {
        ...params.activeRecord,
        ...params.pagination(12),
        ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
        ...params.generateLookup.in(['category', 'id'], categories),
      },
    })
    return randomData.results
  },
  async [ARTICLE_MODULE.actionFetchArticleTrending]({ commit, rootGetters, state, rootState }, { page }) {
    let articleDetail = await requestAPI.get(SERVER_API.article, {
      params: {
        ...params.activeRecord,
        ...params.pagination(PAGE_SIZE_OF_CATEGORY_DEFAULT, page),
        ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
        ...params.orderingTopView,
      },
    })
    return articleDetail
  },
}
