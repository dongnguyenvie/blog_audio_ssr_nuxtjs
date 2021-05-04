import { Middleware } from '@nuxt/types'
import { UI_MODULE } from '~/types/store'

const skeltonMiddleware: Middleware = ({ store, route, from }) => {
  if (process.client) {
    if (from.name !== route.name) {
      store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetSkeltonLoading, true)
      store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetNextPage, route.name)
      const isNavbar = store.getters[UI_MODULE.namespace + '/' + UI_MODULE.getStatusNavBar]
      if (isNavbar) {
        store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetStatusNavBar, { flg: false })
      }
    }
  }
}

export default skeltonMiddleware
