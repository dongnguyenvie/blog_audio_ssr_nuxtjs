import { state as rootState, getters as rootGetters } from '~/store'
import { state as homeState } from '~/store/home'
import { state as detailState } from '~/store/detail'
import { state as socketState } from '~/store/socket'
import { state as categoryState } from '~/store/category'
import { Mapper, MapperWithNamespace, mapGetters, Computed } from 'vuex'

export type TComputed<T> = () => T
export type TMapGetters<T> = Mapper<TComputed<T>> & MapperWithNamespace<TComputed<T>>

export type TRootState = ReturnType<typeof rootState>
export type THomeState = ReturnType<typeof homeState>
export type TDetailState = ReturnType<typeof detailState>
export type TSocketState = ReturnType<typeof socketState>
export type TCategoryState = ReturnType<typeof categoryState>

export type TRootGetters = typeof rootGetters

export enum HOME_MODULE {
  namespace = 'home',
  /** GETTERS */
  getHastagSessionData = 'HOME/GETTER/HASTAG_SESSION_DATA',
  getTrendingSessionData = 'HOME/GETTER/TRENDING_SESSION_DATA',
  getRecommendSessionData = 'HOME/GETTER/RECOMMEND_SESSION_DATA',
  getLoadingRecommendSessionData = 'HOME/GETTER/LOADING_RECOMMEND_SESSION_DATA',
  getCategoriesHomeSessions = 'HOME/GETTER/CATEGORIES_HOME_SESSIONS',
  getDynamicHomeSessions = 'HOME/GETTER/DYNAMIC_SESSIONS',
  /** MUTATIONS */
  mutationSetSession = 'HOME/MUTATION/SET_SESSION',
  mutationSetTrending = 'HOME/MUTATION/SET_TRENDING',
  mutationSetRecommend = 'HOME/MUTATION/SET_RECOMMEND',
  mutationSetLoadingRecommend = 'HOME/MUTATION/SET_LOADING_RECOMMEND',
  mutationSetDynamicHomeSessions = 'HOME/MUTATION/SET_DYNAMIC_HOME_SESSIONS',
  /** ACTIONS */
  actionFetchFirstData = 'HOME/ACTION/FETCH_FIRST_DATA',
  actionFetchTrendingData = 'HOME/ACTION/FETCH_TRENDING_DATA',
  actionFetchRecommendData = 'HOME/ACTION/FETCH_RECOMMEND_DATA',
  actionFetchHastagData = 'HOME/ACTION/FETCH_HASTAG_DATA',
  actionFetchDynamicHomeSessions = 'HOME/ACTION/FETCH_DYNAMIC_HOME_SESSIONS',
}

export enum DETAIL_MODULE {
  namespace = 'detail',
  /** GETTERS */
  getArticleData = 'DETAIL/GETTER/ARTICLE_DATA',
  /** MUTATIONS */
  mutationSetArticleData = 'DETAIL/MUTATION/SET_ARTICLE_DATA',
  /** ACTIONS */
  actionFetchArticleData = 'DETAIL/ACTION/FETCH_ARTICLE_DATA',
}

export enum SOCKET_MODULE {
  namespace = 'socket',
  /** GETTERS */
  getId = 'SOCKET/GETTER/ID',
  /** MUTATIONS */
  mutationSocketOnOpen = 'SOCKET/MUTATION/SOCKET_ON_OPEN',
  mutationSocketOnClose = 'SOCKET/MUTATION/SOCKET_ON_CLOSE',
  mutationSocketOnError = 'SOCKET/MUTATION/SOCKET_ON_ERROR',
  mutationSocketOnMessage = 'SOCKET/MUTATION/SOCKET_ON_MESSAGE',
  mutationSocketReconnect = 'SOCKET/MUTATION/SOCKET_RECONNECT',
  mutationSocketReconnectError = 'SOCKET/MUTATION/SOCKET_RECONNECT_ERROR',
  mutationSocketSetId = 'SOCKET/MUTATION/SOCKET_SET_ID',
  /** ACTIONS */
  actionSocketSendMessage = 'SOCKET/ACTION/SOCKET_SEND_MESSAGE',
}

export enum UI_MODULE {
  namespace = 'ui',
  /** GETTERS */
  getSkeltonLoading = 'UI/GETTER/SKELTON_LOADING',
  getNextPage = 'UI/GETTER/NEXT_PAGE',
  getWidthScreen = 'UI/GETTER/WIDTH_SCREEN',
  getBreakpointNm = 'UI/GETTER/BREAKPOINT_NM',
  getStatusNavBar = 'ROOT/GETTER/STATUS_NAV_BAR',
  /** MUTATIONS */
  mutationSetSkeltonLoading = 'UI/MUTATION/SET_SKELTON_LOADING',
  mutationSetNextPage = 'UI/MUTATION/SET_NEXT_PAGE',
  mutationSetWidthScreen = 'UI/MUTATION/SET_WIDTH_SCREEN',
  mutationSetStatusNavBar = 'ROOT/MUTATION/SET_STATUS_NAR_BAR',
  /** ACTIONS */
}

export enum ROOT_MODULE {
  namespace = '',
  /** GETTERS */
  getCategories = 'ROOT/GETTER/CATEGORIES',
  getCategoriesRecord = 'ROOT/GETTER/CATEGORIES_RECORD',
  getSettings = 'ROOT/GETTER/SETTINGS',
  getSettingsRecord = 'ROOT/GETTER/SETTINGS_RECORD',
  getTags = 'ROOT/GETTER/TAGS',
  getTagsRecord = 'ROOT/GETTER/TAGS_RECORD',
  getWatchingArticle = 'ROOT/GETTER/WATCHING_ARTICLE',
  getTagsSelected = 'ROOT/GETTER/TAGS_SELECTED',
  getUser = 'ROOT/GETTER/USER',
  /** MUTATIONS */
  mutationSetCategories = 'ROOT/MUTATION/SET_CATEGORIES',
  mutationSetSettings = 'ROOT/MUTATION/SET_SETTINGS',
  mutationSetTags = 'ROOT/MUTATION/SET_TAGS',
  mutationSetWatchingArticle = 'ROOT/MUTATION/SET_WATCHING_ARTICLE',
  mutationSetTagsSelected = 'ROOT/MUTATION/SET_TAGS_SELECTED',
  mutationSetUSer = 'ROOT/MUTATION/SET_USER',
  /** ACTIONS */
  actionFetchCategories = 'ROOT/ACTION/FETCH_CATEGORIES',
  actionFetchSettings = 'ROOT/ACTION/FETCH_SETTINGS',
  actionFetchTags = 'ROOT/ACTION/FETCH_TAGS',
}

export enum CATEGORY_MODULE {
  namespace = 'category',
  /** GETTERS */
  /** MUTATIONS */
  /** ACTIONS */
  actionFetchCategory = 'CATEGORY/ACTION/FETCH_CATEGORY',
}

export enum ARTICLE_MODULE {
  namespace = 'article',
  /** GETTERS */
  /** MUTATIONS */
  /** ACTIONS */
  actionFetchArticleWithListID = 'ARTICLE/ACTION/FETCH_ARTICLE_WITH_LIST_ID',
  actionFetchArticleWithSlug = 'ARTICLE/ACTION/FETCH_ARTICLE_WITH_SLUG',
  actionFetchRandomArticleData = 'ARTICLE/ACTION/FETCH_RANDOM_ARTICLE_DATA',
  actionFetchRandomArticleDataWithCategories = 'ARTICLE/ACTION/FETCH_RANDOM_ARTICLE_DATA_WITH_CATEGORIES',
  actionFetchArticleTrending = 'ARTICLE/ACTION/FETCH_ARTICLE_TRENDING',
}

export enum BLOG_MODULE {
  namespace = 'blog',
  /** GETTERS */
  /** MUTATIONS */
  /** ACTIONS */
  actionFetchArticleWithBlog = 'BLOG/ACTION/FETCH_ARTICLE_WITH_BLOG',
}

export enum COMMENT_MODULE {
  namespace = 'comment',
  /** GETTERS */
  /** MUTATIONS */
  /** ACTIONS */
  actionFetchCommentsOfArticle = 'COMMENT/ACTION/FETCH_COMMENTS_OF_ARTICLE',
  actionFetchNewComments = 'COMMENT/ACTION/FETCH_NEW_COMMENTS',
}
