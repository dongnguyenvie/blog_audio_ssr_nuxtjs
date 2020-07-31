<template>
  <section class="flex flex-wrap w-full overflow-hidden">
    <SessionHeadTagVue :title="title" :isGird="isGird" @on-toggle="handleToggle" />
    <template v-if="data.length">
      <div v-if="isGird" class="w-full flex flex-wrap">
        <ArticleBoxVue
          v-for="article in data"
          :data="article"
          :showCategoryNm="showCategoryNm"
          :showViews="showViews"
          :key="`gird-${article.id}`"
          @onRedirectArticleDetail="handleRedirectArticleDetail"
        />
      </div>
      <div v-else class="w-full flex flex-col">
        <ArticleFullBoxVue v-for="(article, index) in data" :data="article" :showCategoryNm="showCategoryNm" :showViews="showViews" :key="`list-${article.id}${index}`" />
      </div>
    </template>
    <template v-else>
      <NoDataBoxVue class="pb-12" />
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { TArticles, IArticle } from '~/types/article'
import ArticleBoxVue from '~/components/ArticleBox.vue'
import ArticleFullBoxVue from '~/components/ArticleFullBox.vue'
import NoDataBoxVue from '~/components/NoDataBox.vue'
import SessionHeadTagVue from '~/components/tags/SessionHeadTag.vue'

@Component({
  components: {
    ArticleFullBoxVue,
    ArticleBoxVue,
    NoDataBoxVue,
    SessionHeadTagVue,
  },
})
export default class ArticlesSkeletonSession extends Vue {
  isGird = true

  @Prop({ type: Array, required: true }) data!: TArticles
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) showCategoryNm!: boolean
  @Prop({ type: Boolean, default: false }) showViews!: boolean

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
    this.$emit('onRedirectArticleDetail', article)
  }
}
</script>
<style></style>
