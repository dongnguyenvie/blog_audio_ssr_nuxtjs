<template>
  <ListArticlePageLayout
    :title="currentCategory.title"
    :description="currentCategory.description"
    :data="articlePaginator.results"
    :totalPages="totalPages"
    :total="articlePaginator.count"
    :currentPage="currentPage"
    :showCategoryNm="false"
    show-blog
    @on-redirect-article-detail="handleRedirectArticleDetail"
    @on-page-change="handleChangePage"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import ListArticlePageLayout from '~/components/shared/ListArticlePageLayout.vue'
import { ROOT_MODULE, CATEGORY_MODULE } from '~/types/store'
import { Category } from '~/types/category'
import { checkAndGetSlug } from '~/utils'
import { IArticle } from '~/types/article'
import { Result } from '~/types/result'
import { FORMAT_SLUG, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'

@Component({
  components: {
    ListArticlePageLayout,
  },
  async fetch({ store, params, route, error }) {},
  async asyncData({ store, params, error }) {
    const slug = params.slug
    const page = Number(params.page) || 1
    let currentCategory = null
    let articlePaginator = null
    try {
      let categories = store.getters[ROOT_MODULE.getCategories] as Category[]
      let categoryFound = categories.find((category) => category.slug === slug) as Category
      const result: any = await store.dispatch(CATEGORY_MODULE.namespace + '/' + CATEGORY_MODULE.actionFetchCategory, { id: categoryFound.id, page: page })
      if (!result) {
        throw new Error()
      }
      currentCategory = result.categoryDetail
      articlePaginator = result.articleDetail
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    return {
      currentCategory,
      articlePaginator,
    }
  },
})
export default class CategoryDetailPage extends Vue {
  currentCategory!: Category
  articlePaginator!: Result & { results: IArticle[] }
  pageSize = PAGE_SIZE_OF_CATEGORY_DEFAULT

  @Getter(ROOT_MODULE.getCategories) categories!: Category[]

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$router.push({ name: this.$routeNames.articleDetailPage, params: { slug: article.slug + FORMAT_SLUG } })
  }

  @Emit()
  handleChangePage(page: number) {
    this.$router.push({ name: this.$routeNames.categoryDetailPage, params: { slug: this.currentCategory.slug, page: `${page}` } })
  }

  get currentPage() {
    return Number(this.$route.params.page)
  }

  get totalPages() {
    return Math.ceil(this.articlePaginator.count / PAGE_SIZE_OF_CATEGORY_DEFAULT)
  }

  mounted() {
    // ;(window as any).quynh = this
    // this.articlePaginator.forEach(e => {
    //   e.
    // })
  }
}
</script>
