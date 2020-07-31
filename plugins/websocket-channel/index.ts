import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import { WEBSOCKET_API } from '~/utils/contants'
import ReconnectingWebSocket from '~/plugins/websocket-channel/reconnectingWebsocket'
import * as event from './event'

declare module 'vue/types/vue' {
  interface Vue {
    $ws: ReconnectingWebSocket
  }
}

const websocketChannel: Plugin = (context, inject) => {
  const { store, env } = context
  if (env.ENABLE_WEBSOCKET_PLUGIN === 'true') {
    let ws = new ReconnectingWebSocket(env.WEBSOCKET_API_URL + WEBSOCKET_API.popularWachingAudio)
    event.provider(ws, store)

    Vue.prototype.$ws = ws
  }
}

export default websocketChannel
