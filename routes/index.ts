import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '~/components/pages/HomePage.vue'
import ArticleDetailPage from '~/components/pages/ArticleDetailPage.vue'
import CategoryDetailPage from '~/components/pages/CategoryDetailPage.vue'
import ArticleHistoryPage from '~/components/pages/ArticleHistoryPage.vue'
import TrendingPage from '~/components/pages/TrendingPage.vue'
import BlogPage from '~/components/pages/BlogPage.vue'
import Page404 from '~/components/pages/404.vue'
import Page422 from '~/components/pages/422.vue'
import Page500 from '~/components/pages/500.vue'
import { ROUTE_NAMES } from '~/utils/contants'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: ROUTE_NAMES.homePage,
        path: '/',
        component: HomePage,
      },
      {
        name: ROUTE_NAMES.page404,
        path: '/404',
        component: Page404,
      },
      {
        name: ROUTE_NAMES.page422,
        path: '/422',
        component: Page422,
      },
      {
        name: ROUTE_NAMES.page500,
        path: '/500',
        component: Page500,
      },
      {
        name: ROUTE_NAMES.articleHistoryPage,
        path: '/feed/history',
        component: ArticleHistoryPage,
      },
      {
        name: ROUTE_NAMES.trendingPage,
        path: '/feed/trending',
        component: TrendingPage,
      },
      {
        name: ROUTE_NAMES.categoryDetailPage,
        path: '/the-loai/:slug/:page',
        component: CategoryDetailPage,
      },
      {
        name: ROUTE_NAMES.blogDetailPage,
        path: '/blog/:slug/:page',
        component: BlogPage,
      },
      {
        name: ROUTE_NAMES.articleDetailPage,
        path: '/:slug',
        component: ArticleDetailPage,
      },
    ],
  })
}
