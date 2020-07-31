export const FORMAT_SLUG = '.html'

export const API_URL = process.env.API_URL || 'http://localhost:8000/'
export const WEBSOCKET_API_URL = process.env.WEBSOCKET_API_URL || 'ws://localhost:8000/'

export const API_PREFIX = 'api'
export const API_VERSION = 'v1'
export const SERVER_API = {
  article: `${API_PREFIX}/${API_VERSION}/article/`,
  articleWithSlug: `${API_PREFIX}/${API_VERSION}/article/slug/`,
  user: `${API_PREFIX}/${API_VERSION}/user/`,
  blog: `${API_PREFIX}/${API_VERSION}/blog/`,
  widget: `${API_PREFIX}/${API_VERSION}/widget/`,
  category: `${API_PREFIX}/${API_VERSION}/category/`,
  menu: `${API_PREFIX}/${API_VERSION}/menu/`,
  setting: `${API_PREFIX}/${API_VERSION}/setting/`,
  tag: `${API_PREFIX}/${API_VERSION}/tag/`,
}
export const WEBSOCKET_API = {
  popularWachingAudio: `popular-watching-audio/`,
}

export const LOCALSTORAGE_PREFIX = 'audio__'

export const TOKEN_KEY = 'TOKEN'

export const PAGE_SIZE_DEFAULT = 10

export const DYNAMICS_HOME_SESSION_SETTING = 'DYNAMICS_HOME_SESSION_SETTING'

export const WS_TYPES = {
  POPULAR_AUDIO: 'POPULAR_AUDIO',
  UPDATED_POPULAR_AUDIO: 'UPDATED_POPULAR_AUDIO',
  ACTIONS: {
    QUERY_CONNECT_SETTINGS: 'WS_TYPES/QUERY_CONNECT_SETTINGS',
    QUERY_ALL_POPULAR_AUDIO: 'WS_TYPES/WATCH/QUERY_ALL_POPULAR_AUDIO',
    TRACKING_WATCH_AUDIO: 'WS_TYPES/WATCH/TRACKING_WATCH_AUDIO',
    TRACKING_UNWATCH_AUDIO: 'WS_TYPES/WATCH/TRACKING_UNWATCH_AUDIO',
  },
}

export const NAVBAR = [
  {
    label: '',
    children: [
      {
        icon: 'home',
        label: 'Home',
        url: 'index',
      },
      {
        icon: 'fire',
        label: 'Trending',
        url: 'trending',
      },
      {
        icon: 'dice-d20',
        label: 'subscriptions',
        url: 'subscriptions',
      },
    ],
  },
  {
    label: '',
    children: [
      {
        icon: 'photo-video',
        label: 'Library',
        url: 'trending',
      },
      {
        icon: 'history',
        label: 'history',
        url: 'index',
      },
      {
        icon: 'blog',
        label: 'My blog',
        url: 'index',
      },
    ],
  },
]

export const TAG_DEFAULT = {
  id: 'all',
  title: 'All recommendations',
  content: '',
  isDeleted: false,
  meta: null,
}

export const ARTICLE_FORMAT = {
  1: {
    key: 1,
    type: 'post',
    component: '',
  },
  2: {
    key: 2,
    type: 'video',
    component: 'VideoPlayer',
  },
  3: {
    key: 3,
    type: 'audio',
    component: 'AudioPlayer',
  },
  4: {
    key: 4,
    type: 'image',
    component: '',
  },
  5: {
    key: 5,
    type: 'other',
    component: '',
  },
} as Record<number, { key: number; type: string; component: string }>
