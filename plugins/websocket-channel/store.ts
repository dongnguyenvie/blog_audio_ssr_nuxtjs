import { Store } from 'vuex'
import { WS_TYPES } from '~/utils/contants'
import ReconnectingWebSocket from './reconnectingWebsocket'
import { ROOT_MODULE, SOCKET_MODULE, HOME_MODULE } from '~/types/store'

export const mapDataSocketToStore = (store: Store<any>, action: any) => {
  switch (action.clientType) {
    case WS_TYPES.ACTIONS.QUERY_ALL_POPULAR_AUDIO: {
      store.commit(ROOT_MODULE.mutationSetWatchingArticle, action.payload)
      return
    }
    case WS_TYPES.ACTIONS.QUERY_CONNECT_SETTINGS: {
      store.commit(SOCKET_MODULE.namespace + '/' + SOCKET_MODULE.mutationSocketSetId, action.payload)
      return
    }
    // case WS_TYPES.ACTIONS.TRACKING_WATCH_AUDIO: {
    //   const trendingSessionData = store.getters[S_HOME_KEY + HOME_MODULE.trendingSessionData] || []
    //   const dataUpdated = action.payload
    //   const indexFound = trendingSessionData.findIndex((data: any) => {
    //     return data.idWs === dataUpdated.idWs
    //   })
    //   if (indexFound !== -1) {
    //     trendingSessionData[indexFound] = dataUpdated
    //   } else {
    //     trendingSessionData.push(dataUpdated)
    //   }
    //   store.commit(S_HOME_KEY + HOME_MODULE.setTrending, trendingSessionData)
    //   return
    // }
    case WS_TYPES.ACTIONS.TRACKING_UNWATCH_AUDIO: {
      const trendingSessionData = store.getters[HOME_MODULE.namespace + '/' + HOME_MODULE.getTrendingSessionData] || []
      const dataUpdated = action.payload
      const indexFound = trendingSessionData.findIndex((data: any) => {
        return data.id === dataUpdated.id
      })
      const articleFound = trendingSessionData[indexFound]
      if (!articleFound.view) {
        trendingSessionData.splice(indexFound, 1)
      } else {
        articleFound.view = articleFound.view -= 1
      }
      store.commit(ROOT_MODULE.mutationSetWatchingArticle, trendingSessionData)
      return
    }
  }
  console.warn('W' + ': ', action)
}

export const mapDispatchSocketToActionStore = (ws: ReconnectingWebSocket, action: any) => {
  const { type, payload } = action
  switch (type) {
    case SOCKET_MODULE.namespace + '/' + SOCKET_MODULE.actionSocketSendMessage: {
      if (payload) {
        ws.send(JSON.stringify(payload))
      }
      return
    }
  }
}
