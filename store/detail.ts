import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SERVER_API, DYNAMICS_HOME_SESSION_SETTING } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { TDetailState, TRootState, DETAIL_MODULE } from '~/types/store'

export const state = () => ({
  articleData: {},
})

export const getters: GetterTree<TDetailState, TDetailState> = {
  [DETAIL_MODULE.getArticleData]: (state) => state.articleData,
}

export const mutations: MutationTree<TDetailState> = {
  [DETAIL_MODULE.mutationSetArticleData]: (state, payload) => {
    state.articleData = payload
  },
}

export const actions: ActionTree<TDetailState, TRootState> = {
  async [DETAIL_MODULE.actionFetchArticleData]({ commit }, slug) {
    try {
      let articleDetail = await requestAPI.get(SERVER_API.articleWithSlug + slug + '/')
      // commit(DETAIL_MODULE.mutationSetArticleData, articleDetail)
      return articleDetail
    } catch (error) {
      return false
    }
  },
}
