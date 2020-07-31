<template>
  <div class="w-full py-2">
    <a :href="link" class="flex flex-no-wrap relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after rounded border-b-2 border-gray-300">
      <div class="relative group text-primary-500 w-1/4 h-full">
        <div class="top-0 left-0 h-full">
          <a class="bg-gray-300 group-hover:scale-110 transition-transform transform-center block h-full">
            <img :src="data.thumbnail" />
          </a>
        </div>
      </div>
      <div class="flex flex-col flex-grow w-3/4">
        <div class="pl-2 pr-4 pt-0 mb-4 text-left relative flex-grow">
          <h4 class="text-lg font-bold text-gray-darkest mr-10">
            <p class="w-full inline-block">
              {{ data.title }} <span class="text-sm font-normal">( {{ showCategoryNm ? firstCategoryNm : data.blog }} )</span>
            </p>
            <p class="w-full inline-block">
              <span class="text-sm font-normal">
                {{ data.excerpt }}
              </span>
            </p>
            <p v-if="showViews" class="text-xs font-normal">
              <span>{{ views }} Lượt xem</span>
              <span class="ml-1">• {{ time }}</span>
            </p>
          </h4>
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
export default class ArticleFullBox extends Vue {
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
