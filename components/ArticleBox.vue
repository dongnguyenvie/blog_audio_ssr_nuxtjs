<template>
  <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
    <a
      :href="link"
      class="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after translate-3d-none-after rounded"
      @click.prevent="handleRedirectArticleDetail(data)"
    >
      <div class="relative group text-primary-500" style="padding-top: 70%;">
        <div class="absolute top-0 left-0 h-full w-full overflow-hidden bg-gray-300">
          <img :src="data.thumbnail" class="skeleton-box w-full group-hover:scale-110 transition-transform transform-center block" :alt="data.title" :title="data.title" />
        </div>
      </div>
      <div class="flex flex-col flex-grow">
        <div class="pt-2 mb-4 text-left relative flex-grow">
          <h4 class="font-bold text-gray-darkest w-full inline-block text-sm">
            {{ data.title }}
          </h4>
          <p class="h-5 w-full inline-block text-sm text-gray-700 font-normal">
            {{ showCategoryNm ? firstCategoryNm : data.blog }}
          </p>
          <p v-if="showViews" class="text-xs font-normal">
            <span>{{ views }} Lượt xem</span>
            <span class="ml-1">• {{ time }}</span>
          </p>
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { ISectionArticle } from '~/types/article'
import { FORMAT_SLUG } from '~/utils/contants'
import { TCategoriesRecord } from '~/types/category'
import { ROOT_MODULE } from '~/types/store'

@Component
export default class ArticleBox extends Vue {
  @Prop({ type: Object, required: true, default: {} }) readonly data!: ISectionArticle
  @Prop({ type: Boolean, required: false }) readonly showCategoryNm!: boolean
  @Prop({ type: Boolean, required: false }) readonly showViews!: boolean

  @Getter(ROOT_MODULE.getCategoriesRecord) readonly categoriesRecord!: TCategoriesRecord

  get categoriesNm() {
    return (this.data.categories || []).map((idCategory) => this.categoriesRecord[idCategory].title)
  }

  get firstCategoryNm() {
    return this.categoriesNm.length ? this.categoriesNm[0] : ''
  }

  get views() {
    return this.data!.meta!.view
  }

  get time() {
    return this.$moment(this.data?.meta?.timestamp).fromNow()
  }

  get link() {
    return this.data.slug + FORMAT_SLUG
  }

  @Emit()
  handleRedirectArticleDetail(article: ISectionArticle) {
    this.$emit('onRedirectArticleDetail', article)
  }
}
</script>
<style></style>
