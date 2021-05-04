import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import { ROUTE_NAMES } from '~/utils/contants'

declare module 'vue/types/vue' {
  interface Vue {
    $routeNames: typeof ROUTE_NAMES
  }
}

const injectGlobal: Plugin = () => {
  Vue.prototype.$routeNames = ROUTE_NAMES
}

export default injectGlobal
