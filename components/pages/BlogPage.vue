<template>
  <ListArticlePageLayout
    :data="articlePaginator.results"
    show-category-nm
    :title="currentBlog.title"
    :description="currentBlog.content"
    :totalPages="totalPages"
    :total="articlePaginator.count"
    :currentPage="currentPage"
    @on-page-change="handleChangePage"
    @on-redirect-article-detail="handleRedirectArticleDetail"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import ListArticlePageLayout from '~/components/shared/ListArticlePageLayout.vue'
import { BLOG_MODULE } from '~/types/store'
import { Result } from '~/types/result'
import { IArticle } from '~/types/article'
import { Blog } from '~/types/blog'
import { PAGE_SIZE_OF_CATEGORY_DEFAULT, FORMAT_SLUG } from '~/utils/contants'

@Component({
  components: {
    ListArticlePageLayout,
  },
  async asyncData({ store, params, error }) {
    const slug = params.slug
    const page = Number(params.page) || 1
    let currentBlog = null
    let articlePaginator = null
    try {
      const result: any = await store.dispatch(BLOG_MODULE.namespace + '/' + BLOG_MODULE.actionFetchArticleWithBlog, { slug: slug, page: page })
      if (!result) {
        throw new Error()
      }
      articlePaginator = result.articlesData
      currentBlog = result.blogDetail
    } catch (err) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    return {
      articlePaginator,
      currentBlog,
    }
  },
})
export default class BlogPage extends Vue {
  currentBlog!: Blog
  articlePaginator!: Result & { results: IArticle[] }
  pageSize = PAGE_SIZE_OF_CATEGORY_DEFAULT

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$router.push({ name: this.$routeNames.articleDetailPage, params: { slug: article.slug + FORMAT_SLUG } })
  }

  @Emit()
  handleChangePage(page: number) {
    this.$router.push({ name: this.$routeNames.blogDetailPage, params: { slug: this.currentBlog.slug, page: `${page}` } })
  }

  get currentPage() {
    return Number(this.$route.params.page)
  }

  get totalPages() {
    return Math.ceil(this.articlePaginator.count / PAGE_SIZE_OF_CATEGORY_DEFAULT)
  }

  mounted() {}
}
</script>
