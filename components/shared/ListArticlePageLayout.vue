<template>
  <div class="flex flex-wrap px-8">
    <section v-if="showTitle" class="flex flex-wrap w-full pt-3 pb-3 border-gray-200">
      <h1 class="w-full block uppercase text-lg font-bold">{{ title }}</h1>
      <article v-if="showDescription" v-html="description"></article>
    </section>
    <section class="flex flex-wrap w-full pt-2">
      <ArticleSession
        :data="data"
        :defaultGird="defaultGird"
        :showCategoryNm="showCategoryNm"
        :showBlog="showBlog"
        @on-redirect-article-detail="handleRedirectArticleDetail"
        class="pb-6 pt-6 border-t-2 border-gray-200"
      />
    </section>
    <client-only v-if="totalPages" placeholder="Đang tải phân trang...">
      <PaginationBar :totalPages="totalPages" :total="total" :currentPage="currentPage" @on-page-change="handleChangePage" />
    </client-only>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import PaginationBar from '~/components/shared/PaginationBar.vue'
import ArticleSession from '~/components/sessions/ArticleSession.vue'
import { IArticle } from '~/types/article'

@Component({
  components: {
    PaginationBar,
    ArticleSession,
  },
})
export default class ListArticlePageLayout extends Vue {
  @Prop({ type: Array, default: '' }) data!: IArticle[]
  @Prop({ type: String, default: '' }) description!: string
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Number, default: 0 }) totalPages!: number
  @Prop({ type: Number, default: 0 }) total!: number
  @Prop({ type: Number, default: 0 }) currentPage!: number
  @Prop({ type: Boolean, default: true }) showDescription!: boolean
  @Prop({ type: Boolean, default: true }) showTitle!: boolean
  @Prop({ type: Boolean, default: true }) defaultGird!: boolean
  @Prop({ type: Boolean, default: true }) showCategoryNm!: boolean
  @Prop({ type: Boolean, default: true }) showBlog!: boolean

  @Emit()
  handleChangePage(page: number) {
    this.$emit('on-page-change', page)
  }

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$emit('on-redirect-article-detail', article)
  }
}
</script>
