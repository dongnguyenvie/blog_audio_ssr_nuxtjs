import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import { browserStorage } from '~/utils/localStorage'
import { USER_PROFILE_KEY } from '~/utils/contants'
import { ROOT_MODULE, UI_MODULE } from '~/types/store'
import { createRandomCode } from '~/utils'

const initialClient: Plugin = ({ store, route }, inject) => {
  store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetWidthScreen, window.innerWidth)
  store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetNextPage, route.name)

  let user = browserStorage.get(USER_PROFILE_KEY)
  if (!user) {
    const userGenerated = {
      name: `user_${createRandomCode(6)}`,
      timestamp: new Date().getTime(),
      isLogin: false,
    }
    browserStorage.set(USER_PROFILE_KEY, userGenerated)
    user = userGenerated
  }
  store.commit(ROOT_MODULE.mutationSetUSer, user)
}

export default initialClient
