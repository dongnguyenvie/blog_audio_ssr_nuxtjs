import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { COMMENT_MODULE } from '~/types/store'
import { SERVER_API, PAGE_SIZE_DEFAULT, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { defaultDataWithPagination } from '~/utils'

export const actions: ActionTree<any, any> = {
  async [COMMENT_MODULE.actionFetchCommentsOfArticle]({ commit }, { articleId }) {
    try {
      let comments = await requestAPI.get(SERVER_API.comment, {
        params: {
          ...params.activeRecord,
          // ...params.pagination(PAGE_SIZE_OF_CATEGORY_DEFAULT, page),
          // ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog_title,blog_slug,categories,meta'),
          ...params.orderingCreatedAt,
          ...params.generateLookup.exact(['article'], articleId),
        },
      })
      return comments
    } catch (error) {
      return defaultDataWithPagination()
    }
  },
  async [COMMENT_MODULE.actionFetchNewComments]({ commit }) {
    try {
      let comments = await requestAPI.get(SERVER_API.comment, {
        params: {
          ...params.activeRecord,
          ...params.pagination(4, 1),
          // ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog_title,blog_slug,categories,meta'),
          ...params.orderingCreatedAt,
        },
      })
      return comments
    } catch (error) {
      return defaultDataWithPagination()
    }
  },
}
