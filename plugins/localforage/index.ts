import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import localforage from 'localforage'

declare module 'vue/types/vue' {
  interface Vue {
    $localForage: {
      media: typeof localforage
    }
  }
}

const VueLocalforage: Plugin = (context, inject) => {
  const media = localforage.createInstance({
    name: 'media',
  })
  const localforageInstance = {
    media: media,
  }
  Vue.prototype.$localForage = localforageInstance
  ;(window as any).$localForage = localforageInstance
}

export default VueLocalforage
