<template>
  <ListArticlePageLayout
    :data="articlePaginator.results"
    show-category-nm
    :title="title"
    :showDescription="false"
    :showBlog="false"
    :totalPages="totalPages"
    :total="articlePaginator.count"
    :currentPage="currentPage"
    @on-page-change="handleChangePage"
    @on-redirect-article-detail="handleRedirectArticleDetail"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'

import ListArticlePageLayout from '~/components/shared/ListArticlePageLayout.vue'
import { ARTICLE_MODULE } from '~/types/store'
import { ARTICLE_FORMAT, FORMAT_SLUG, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { Result } from '~/types/result'
import { IArticle } from '~/types/article'
import { get } from 'lodash'

@Component({
  components: {
    ListArticlePageLayout,
  },
  async asyncData({ store, params, error }) {
    const page = Number(params.page) || 1
    let articlePaginator = null
    try {
      const result: any = await store.dispatch(ARTICLE_MODULE.namespace + '/' + ARTICLE_MODULE.actionFetchArticleTrending, { page: page })
      if (!result) {
        throw new Error()
      }
      articlePaginator = result
    } catch (err) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    return {
      articlePaginator,
    }
  },
})
export default class TrendingPage extends Vue {
  title = 'Top Lượt xem'
  articlePaginator!: Result & { results: IArticle[] }

  @Action(ARTICLE_MODULE.actionFetchArticleTrending, { namespace: ARTICLE_MODULE.namespace }) onFetchArticleTrending!: (payload: { page: number }) => Promise<any>

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$router.push({ name: this.$routeNames.articleDetailPage, params: { slug: article.slug + FORMAT_SLUG } })
  }

  @Emit()
  handleChangePage(page: number) {
    this.$router.push({ name: this.$routeNames.trendingPage, query: { page: `${page}` } })
  }

  get currentPage() {
    return Number(get(this.$route.query, 'page', 1))
  }

  get totalPages() {
    return Math.ceil(this.articlePaginator.count / PAGE_SIZE_OF_CATEGORY_DEFAULT)
  }

  @Emit()
  async refresharticlePaginatorData() {
    const articlePaginator = await this.onFetchArticleTrending({ page: this.currentPage })
    this.articlePaginator = articlePaginator
  }

  @Watch('currentPage')
  onPageChanged(val: number) {
    this.refresharticlePaginatorData()
  }
}
</script>
