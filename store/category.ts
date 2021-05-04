import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { CATEGORY_MODULE, TCategoryState, TRootState } from '~/types/store'
import { SERVER_API, PAGE_SIZE_DEFAULT, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'

export const state = () => ({})

export const actions: ActionTree<TCategoryState, TRootState> = {
  async [CATEGORY_MODULE.actionFetchCategory]({ commit }, { id: idCategory, page }) {
    try {
      let categoryDetail = await requestAPI.get(SERVER_API.category + idCategory + '/')
      let articleDetail = await requestAPI.get(SERVER_API.article, {
        params: {
          ...params.activeRecord,
          ...params.pagination(PAGE_SIZE_OF_CATEGORY_DEFAULT, page),
          ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog_title,blog_slug,categories,meta'),
          ...params.orderingCreatedAt,
          ...params.generateLookup.exact(['categories', 'id'], idCategory),
        },
      })
      return { articleDetail, categoryDetail }
    } catch (error) {
      return false
    }
  },
}
