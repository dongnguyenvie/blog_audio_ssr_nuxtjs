// Refs https://stackoverflow.com/questions/57178253/how-to-create-skeleton-loading-in-nuxt-js
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { UI_MODULE } from '~/types/store'
import { BREAKPOINTS_NM } from '~/utils/contants'

export const state = () => ({
  skeltonLoading: false,
  nextPage: '',
  widthScreen: null as null | number,
  navBar: false as boolean,
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  [UI_MODULE.getSkeltonLoading]: (state) => state.skeltonLoading,
  [UI_MODULE.getNextPage]: (state) => state.nextPage,
  [UI_MODULE.getWidthScreen]: (state) => state.widthScreen,
  [UI_MODULE.getBreakpointNm]: (state) => {
    const wS = state.widthScreen
    if (!wS) return null
    if (wS > BREAKPOINTS_NM.extraLarge.value) {
      return BREAKPOINTS_NM.extraLarge.name
    } else if (wS > BREAKPOINTS_NM.large.value) {
      return BREAKPOINTS_NM.large.name
    } else if (wS > BREAKPOINTS_NM.medium.value) {
      return BREAKPOINTS_NM.medium.name
    } else if (wS > BREAKPOINTS_NM.small.value) {
      return BREAKPOINTS_NM.small.name
    } else {
      return BREAKPOINTS_NM.extraSmall.name
    }
  },
  [UI_MODULE.getStatusNavBar]: (state) => state.navBar,
}

export const mutations: MutationTree<RootState> = {
  [UI_MODULE.mutationSetSkeltonLoading](state, payload) {
    state.skeltonLoading = payload
  },
  [UI_MODULE.mutationSetNextPage](state, payload) {
    state.nextPage = payload
  },
  [UI_MODULE.mutationSetWidthScreen](state, payload) {
    state.widthScreen = payload
  },
  [UI_MODULE.mutationSetStatusNavBar](state, { toggle = false, flg }) {
    if (toggle) {
      state.navBar = !state.navBar
    } else {
      state.navBar = flg
    }
  },
}
