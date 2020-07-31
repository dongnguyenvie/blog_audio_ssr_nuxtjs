// Refs https://stackoverflow.com/questions/57178253/how-to-create-skeleton-loading-in-nuxt-js
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { UI_MODULE } from '~/types/store'

export const state = () => ({
  skeltonLoading: false,
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  [UI_MODULE.getSkeltonLoading]: (state) => state.skeltonLoading,
}

export const mutations: MutationTree<RootState> = {
  [UI_MODULE.mutationSetSkeltonLoading](state, payload) {
    state.skeltonLoading = payload
  },
}
