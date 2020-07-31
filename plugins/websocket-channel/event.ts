import { Store } from 'vuex'
import { mapDataSocketToStore, mapDispatchSocketToActionStore } from './store'
import ReconnectingWebSocket from './reconnectingWebsocket'
import { SOCKET_MODULE } from '~/types/store'

const listener = (ws: ReconnectingWebSocket, store: Store<any>) => {
  ws.onmessage = function (message) {
    const data = JSON.parse(message.data)
    console.warn('W' + ': ', data)
    mapDataSocketToStore(store, data)
  }
}

const emit = (ws: ReconnectingWebSocket, store: Store<any>) => {
  store.subscribeAction((action) => {
    const { type, payload } = action
    if (type.startsWith(SOCKET_MODULE.namespace + '/')) {
      console.warn(`subscribeAction S_SOCKET_KEY`, type, payload)
    }
    mapDispatchSocketToActionStore(ws, action)
  })
}

export const provider = (ws: ReconnectingWebSocket, store: Store<any>) => {
  listener(ws, store)
  emit(ws, store)

  ws.onopen = (ev) => {
    console.warn('websocketChannel onopen', ev)
  }
  ws.onclose = (ev) => {
    console.warn('websocketChannel onclose', ev)
  }
  ws.onerror = (ev) => {
    console.warn('websocketChannel onerror', ev)
  }
}
