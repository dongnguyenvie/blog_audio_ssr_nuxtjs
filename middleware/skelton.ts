import { Middleware } from '@nuxt/types'
import { UI_MODULE } from '~/types/store'

const skeltonMiddleware: Middleware = ({ store }) => {
  if (!process.server) {
    store.commit(UI_MODULE.namespace + '/' + UI_MODULE.mutationSetSkeltonLoading, true)
  }
}

export default skeltonMiddleware
