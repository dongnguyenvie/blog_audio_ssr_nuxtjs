import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SERVER_API, DYNAMICS_HOME_SESSION_SETTING, TAG_DEFAULT } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { ICategory } from '~/types/category'
import { ISetting } from '~/types/setting'
import { TRootState, ROOT_MODULE } from '~/types/store'
import { ITag } from '~/types/tag'
import { IWachingArticle } from '~/types/article'

export const state = () => ({
  categories: [] as ICategory[],
  settings: [] as ISetting[],
  tags: [] as ITag[],
  watchingArticle: [] as IWachingArticle[],
  tagsSelected: [] as string[],
})

export const getters: GetterTree<TRootState, TRootState> = {
  [ROOT_MODULE.getCategories]: (state) => state.categories,
  [ROOT_MODULE.getCategoriesRecord]: (state): Record<string, ICategory> =>
    state.categories.reduce((categoriesRecord: Record<string, ICategory>, category: ICategory) => {
      categoriesRecord[category.id] = category
      return categoriesRecord
    }, {}),
  [ROOT_MODULE.getSettingsRecord]: (state): Record<string, ISetting | ISetting[]> =>
    state.settings.reduce((settingsRecord: Record<string, ISetting | ISetting[]>, setting: ISetting) => {
      if (setting.key === DYNAMICS_HOME_SESSION_SETTING) {
        settingsRecord[setting.key] = settingsRecord[setting.key] ? [...(settingsRecord[setting.key] as ISetting[]), setting] : [setting]
      } else {
        settingsRecord[setting.key] = setting
      }
      return settingsRecord
    }, {}),
  [ROOT_MODULE.getTags]: (state) => state.tags,
  [ROOT_MODULE.getTagsRecord]: (state): Record<string, ITag> =>
    state.tags.reduce((tagsRecord: Record<string, ITag>, tag) => {
      tagsRecord[tag.id] = tag
      return tagsRecord
    }, {}),
  [ROOT_MODULE.getWatchingArticle]: (state) => state.watchingArticle,
  [ROOT_MODULE.getTagsSelected]: (state) => state.tagsSelected,
}

export const mutations: MutationTree<TRootState> = {
  [ROOT_MODULE.mutationSetCategories](state, payload) {
    state.categories = payload.results
  },
  [ROOT_MODULE.mutationSetSettings](state, payload) {
    state.settings = payload
  },
  [ROOT_MODULE.mutationSetTags](state, payload) {
    state.tags = [TAG_DEFAULT, ...payload.results]
  },
  [ROOT_MODULE.mutationSetWatchingArticle](state, payload) {
    state.watchingArticle = payload
  },
  [ROOT_MODULE.mutationSetTagsSelected](state, payload) {
    state.tagsSelected = payload
  },
}

export const actions: ActionTree<TRootState, TRootState> = {
  async nuxtServerInit({ commit, dispatch }, { req }: { req: any }) {
    // if (req.session.user) {
    // }
    try {
      await dispatch(ROOT_MODULE.actionFetchSettings)
    } catch (error) {}
    try {
      await dispatch(ROOT_MODULE.actionFetchCategories)
    } catch (error) {}
    try {
      await dispatch(ROOT_MODULE.actionFetchTags)
    } catch (error) {}
  },
  async [ROOT_MODULE.actionFetchCategories]({ commit }) {
    const categoriesData = await requestAPI.get(SERVER_API.category, {
      params: {
        ...params.activeRecord,
        ...params.pagination(999),
        ...params.defaultFields('id,title,slug'),
      },
    })
    commit(ROOT_MODULE.mutationSetCategories, categoriesData)
  },
  async [ROOT_MODULE.actionFetchSettings]({ commit }) {
    const settingsData = await requestAPI.get(SERVER_API.setting, {
      params: {
        ...params.activeRecord,
        ...params.pagination(999),
      },
    })
    commit(ROOT_MODULE.mutationSetSettings, settingsData)
  },
  async [ROOT_MODULE.actionFetchTags]({ commit }) {
    const tagsData = await requestAPI.get(SERVER_API.tag, {
      params: {
        ...params.activeRecord,
        ...params.pagination(999),
      },
    })
    commit(ROOT_MODULE.mutationSetTags, tagsData)
  },
}
