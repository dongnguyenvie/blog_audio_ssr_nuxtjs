import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'
import { TDetailState, TRootState, TSocketState, SOCKET_MODULE } from '~/types/store'
import Vue from 'vue'

export const state = () => ({
  socket: {
    id: '',
    isConnected: false,
    message: '',
    reconnectError: false,
  },
})

export const getters: GetterTree<TSocketState, TDetailState> = {
  [SOCKET_MODULE.getId]: (state) => state.socket.id,
}

export const mutations: MutationTree<TSocketState> = {
  [SOCKET_MODULE.mutationSocketOnOpen]: (state, payload) => {
    state.socket.isConnected = true
  },
  [SOCKET_MODULE.mutationSocketOnClose](state, event) {
    state.socket.isConnected = false
  },
  [SOCKET_MODULE.mutationSocketOnError](state, event) {
    console.error(`socketOnError`, state, event)
  },
  // default handler called for all methods
  [SOCKET_MODULE.mutationSocketOnMessage](state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  [SOCKET_MODULE.mutationSocketReconnect](state, count) {
    console.info(`socketReconnect`, state, count)
  },
  [SOCKET_MODULE.mutationSocketReconnectError](state) {
    state.socket.reconnectError = true
  },
  [SOCKET_MODULE.mutationSocketSetId](state, payload) {
    state.socket.id = payload
  },
}

export const actions: ActionTree<TSocketState, TRootState> = {
  async [SOCKET_MODULE.actionSocketSendMessage](ctx, payload) {},
}
