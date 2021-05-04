<template>
  <section class="flex flex-wrap w-full overflow-hidden">
    <SessionHeadTagVue :title="title" :isGird="gird" @on-toggle="handleToggle" />
    <template v-if="data.length">
      <div v-if="gird" class="w-full flex flex-wrap">
        <ArticleGirdBox
          v-for="article in data"
          :data="article"
          :showCategoryNm="showCategoryNm"
          :showViews="showViews"
          :showBlog="showBlog"
          :key="`gird-${article.id}`"
          @on-redirect-article-detail="handleRedirectArticleDetail"
          @on-redirect-blog="handleRedirectBlog"
          @on-redirect-category="handleRedirectCategory"
        />
      </div>
      <div v-else class="w-full flex flex-col">
        <ArticleListBox
          v-for="(article, index) in data"
          :data="article"
          :showCategoryNm="showCategoryNm"
          :showViews="showViews"
          :showBlog="showBlog"
          :key="`list-${article.id}${index}`"
          @on-redirect-article-detail="handleRedirectArticleDetail"
          @on-redirect-blog="handleRedirectBlog"
          @on-redirect-category="handleRedirectCategory"
        />
      </div>
    </template>
    <template v-else>
      <NoDataBoxVue class="pb-12" />
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { isUndefined, isNull } from 'lodash'

import { TArticles, IArticle } from '~/types/article'
import ArticleFullBoxVue from '~/components/ArticleFullBox.vue'
import NoDataBoxVue from '~/components/box/NoDataBox.vue'
import SessionHeadTagVue from '~/components/tags/SessionHeadTag.vue'
import ArticleGirdBox from '~/components/box/ArticleGirdBox.vue'
import ArticleListBox from '~/components/box/ArticleListBox.vue'

@Component({
  components: {
    ArticleListBox,
    ArticleGirdBox,
    NoDataBoxVue,
    SessionHeadTagVue,
  },
})
export default class ArticleSession extends Vue {
  isGird: boolean | null = null

  @Prop({ type: Array, required: true }) data!: TArticles
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) showCategoryNm!: boolean
  @Prop({ type: Boolean, default: false }) showViews!: boolean
  @Prop({ type: Boolean, default: true }) defaultGird!: boolean
  @Prop({ type: Boolean, default: true }) showBlog!: boolean

  get gird() {
    return !isNull(this.isGird) ? this.isGird : this.defaultGird
  }

  @Emit()
  handleToggle(flg?: boolean) {
    if (typeof flg === 'undefined') {
      this.isGird = !this.isGird
      return
    }
    this.isGird = flg
  }

  @Emit()
  handleRedirectArticleDetail(article: IArticle) {
    this.$emit('on-redirect-article-detail', article)
  }

  @Emit()
  handleRedirectBlog(slug: string) {
    this.$emit('on-redirect-blog', slug)
  }

  @Emit()
  handleRedirectCategory(category: any) {
    this.$emit('on-redirect-category', category)
  }
}
</script>
<style></style>
