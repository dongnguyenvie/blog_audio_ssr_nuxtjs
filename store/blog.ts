import { BLOG_MODULE } from '~/types/store'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SERVER_API, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { requestAPI } from '~/utils/request'
import * as params from '~/utils/params'

export const actions: ActionTree<any, any> = {
  async [BLOG_MODULE.actionFetchArticleWithBlog]({ commit }, { slug, page }) {
    try {
      let blogDetail = await requestAPI.get(SERVER_API.blogWithSlug + slug + '/')
      let articlesData = await requestAPI.get(SERVER_API.article, {
        params: {
          ...params.activeRecord,
          ...params.pagination(PAGE_SIZE_OF_CATEGORY_DEFAULT, page),
          ...params.defaultFields('id,slug,title,excerpt,thumbnail,customer,blog,categories'),
          ...params.generateLookup.exact(['blog', 'slug'], slug),
        },
      })
      return {
        blogDetail,
        articlesData,
      }
    } catch (error) {
      return false
    }
  },
}
