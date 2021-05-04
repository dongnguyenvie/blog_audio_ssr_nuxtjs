<template>
  <client-only placeholder="Đang cập lịch sử">
    <ListArticlePageLayout :defaultGird="false" :data="data" :totalPages="totalPages" :total="total" :currentPage="page" @on-page-change="handleChangePage" />
  </client-only>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'

import ListArticlePageLayout from '~/components/shared/ListArticlePageLayout.vue'
import { AUDIO_LISTED_HISTORY_KEY, ARTICLE_FORMAT, FORMAT_SLUG, PAGE_SIZE_OF_CATEGORY_DEFAULT } from '~/utils/contants'
import { ARTICLE_MODULE } from '~/types/store'
import { IArticle } from '~/types/article'
import { isObject, get } from 'lodash'

@Component({
  components: {
    ListArticlePageLayout,
  },
})
export default class ArticleHistoryPage extends Vue {
  data: IArticle[] = []
  total: number = 0
  @Action(ARTICLE_MODULE.actionFetchArticleWithListID, { namespace: ARTICLE_MODULE.namespace }) onFetchArticlesWithListID!: (
    ids: string[]
  ) => Promise<IArticle[]>

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$router.push({ name: this.$routeNames.articleDetailPage, params: { slug: article.slug + FORMAT_SLUG } })
  }

  get page(): number {
    return Number(get(this.$route.query, 'page', 1))
  }

  get end(): number {
    return this.begin + PAGE_SIZE_OF_CATEGORY_DEFAULT
  }

  get begin() {
    return (this.page - 1) * PAGE_SIZE_OF_CATEGORY_DEFAULT
  }

  get totalPages() {
    return Math.ceil(this.total / PAGE_SIZE_OF_CATEGORY_DEFAULT)
  }

  @Emit()
  async loadArticlesHistory() {
    if (process.client) {
      const audioListedHistory = (await this.$localForage.media.getItem(AUDIO_LISTED_HISTORY_KEY)) as string[]
      this.total = audioListedHistory.length
      const audioListedHistoryFilter = audioListedHistory.slice(this.begin, this.end)
      const articlesData = await this.onFetchArticlesWithListID(audioListedHistory)
      const articlesRecord = (articlesData || []).reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
      }, {} as Record<string, IArticle>)
      this.data = audioListedHistory.map((id) => articlesRecord[id]).filter((article) => isObject(article))
    }
  }

  @Emit()
  handleChangePage(page: number) {
    this.$router.push({ query: { page: page } as any })
  }

  async created() {}
  async mounted() {}

  @Watch('page', { immediate: true })
  onPageChanged(val: number) {
    this.loadArticlesHistory()
  }
}
</script>
