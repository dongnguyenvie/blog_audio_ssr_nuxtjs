import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SERVER_API, DYNAMICS_HOME_SESSION_SETTING } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { THomeState, TRootState, TRootGetters, HOME_MODULE, ROOT_MODULE } from '~/types/store'

export const state = () => ({
  hastagData: [],
  trendingData: [],
  recommendData: [],
  isLoadingRecommendData: false,
  dynamicHomeSession: [],
})

export const getters: GetterTree<THomeState, THomeState> = {
  [HOME_MODULE.getHastagSessionData]: (state) => state.hastagData,
  [HOME_MODULE.getTrendingSessionData]: (state) => state.trendingData,
  [HOME_MODULE.getRecommendSessionData]: (state) => state.recommendData,
  [HOME_MODULE.getLoadingRecommendSessionData]: (state) => state.isLoadingRecommendData,
  [HOME_MODULE.getDynamicHomeSessions]: (state) => state.dynamicHomeSession,
}

export const mutations: MutationTree<THomeState> = {
  [HOME_MODULE.mutationSetTrending]: (state, payload) => {
    state.trendingData = payload.results
  },
  [HOME_MODULE.mutationSetRecommend]: (state, payload) => {
    state.recommendData = payload.results
  },
  [HOME_MODULE.mutationSetLoadingRecommend]: (state, payload) => {
    state.isLoadingRecommendData = payload
  },
  [HOME_MODULE.mutationSetDynamicHomeSessions]: (state, payload) => {
    state.dynamicHomeSession = payload
  },
}

export const actions: ActionTree<THomeState, TRootState> = {
  async [HOME_MODULE.actionFetchTrendingData]({ commit }) {
    let trendingData = await requestAPI.get(SERVER_API.article, {
      params: {
        ...params.activeRecord,
        ...params.pagination(),
        ...params.orderingTopView,
        ...params.defaultFields(),
        ...params.uncategories(false),
      },
    })
    commit(HOME_MODULE.mutationSetTrending, trendingData)
  },
  async [HOME_MODULE.actionFetchHastagData]({ commit }) {},
  async [HOME_MODULE.actionFetchDynamicHomeSessions]({ commit, rootGetters }) {
    let categoriesHomeSessions = []
    let dynamicsHomeSessionSetting = rootGetters[ROOT_MODULE.getSettingsRecord][DYNAMICS_HOME_SESSION_SETTING] || []
    for (let i = 0; i < dynamicsHomeSessionSetting.length; i++) {
      const { id, key, value, option } = dynamicsHomeSessionSetting[i]
      const category = JSON.parse(value)
      let dynamicHomeSession = await requestAPI.get(SERVER_API.article, {
        params: {
          ...params.activeRecord,
          ...params.uncategories(false),
          ...params.pagination(12),
          ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories,meta'),
          ...params.categories(category.id),
        },
      })
      category.articles = dynamicHomeSession.results
      categoriesHomeSessions.push(category)
    }
    commit(HOME_MODULE.mutationSetDynamicHomeSessions, categoriesHomeSessions)
  },
  async [HOME_MODULE.actionFetchRecommendData]({ commit, rootGetters, state, rootState }) {
    let queryParams = params.generateParams({
      ...params.activeRecord,
      ...params.uncategories(false),
      ...params.pagination(12),
      ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
      ...(!rootState.tagsSelected.length || rootState.tagsSelected.includes('all') ? {} : params.tags(rootState.tagsSelected)),
    })
    let recommendData = await requestAPI.get(SERVER_API.article, {
      params: queryParams,
    })
    commit(HOME_MODULE.mutationSetRecommend, recommendData)
  },
  async [HOME_MODULE.actionFetchFirstData]({ dispatch, commit }) {
    try {
      commit(HOME_MODULE.mutationSetLoadingRecommend, true)
      await dispatch(HOME_MODULE.actionFetchDynamicHomeSessions)
    } catch (error) {}
    try {
      await dispatch(HOME_MODULE.actionFetchTrendingData)
    } catch (error) {}
    try {
      await dispatch(HOME_MODULE.actionFetchRecommendData)
    } catch (error) {}
    commit(HOME_MODULE.mutationSetLoadingRecommend, false)
  },
}
