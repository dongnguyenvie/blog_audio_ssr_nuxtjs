<template>
  <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
    <div class="relative group text-primary-500" style="padding-top: 70%;">
      <div class="absolute top-0 left-0 h-full w-full overflow-hidden bg-gray-300">
        <nuxt-link
          :to="{ name: $routeNames.articleDetailPage, params: { slug: slug } }"
          tag="a"
          class="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after translate-3d-none-after rounded"
        >
          <img
            :data-src="data.thumbnail"
            class="skeleton-box w-full group-hover:scale-110 transition-transform transform-center block"
            :alt="data.title"
            :title="data.title"
            v-lazy-load
          />
        </nuxt-link>
      </div>
    </div>
    <div class="flex flex-col flex-grow">
      <div class="pt-2 mb-4 text-left relative flex-grow">
        <h4 class="font-bold text-gray-darkest w-full inline-block text-sm">
          <nuxt-link :to="{ name: $routeNames.articleDetailPage, params: { slug: slug } }" tag="a">
            {{ data.title }}
          </nuxt-link>
        </h4>
        <nuxt-link
          v-if="showCategoryNm && firstCategory.slug"
          :to="{ name: $routeNames.categoryDetailPage, params: { slug: firstCategory.slug, page: 1 } }"
          tag="a"
          class="h-5 w-full inline-block text-sm text-gray-700 font-normal"
        >
          {{ firstCategoryNm }}
        </nuxt-link>
        <nuxt-link
          v-else-if="showBlog"
          :to="{ name: $routeNames.blogDetailPage, params: { slug: data.blog_slug, page: 1 } }"
          tag="a"
          class="h-5 w-full inline-block text-sm text-gray-700 font-normal"
        >
          {{ blog }} <font-awesome-icon class="text-xs fill-current text-blue-400" :icon="['fas', 'check-circle']"></font-awesome-icon>
        </nuxt-link>

        <p v-if="showViews" class="text-xs font-normal">
          <span>{{ views }} Lượt xem</span>
          <span class="ml-1">• {{ time }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { SectionArticle } from '~/types/article'
import { FORMAT_SLUG } from '~/utils/contants'
import { TCategoriesRecord, Category } from '~/types/category'
import { ROOT_MODULE } from '~/types/store'

@Component
export default class ArticleGirdBox extends Vue {
  @Prop({ type: Object, required: true, default: {} }) readonly data!: SectionArticle
  @Prop({ type: Boolean, required: false }) readonly showCategoryNm!: boolean
  @Prop({ type: Boolean, required: false }) readonly showViews!: boolean
  @Prop({ type: Boolean, required: false, default: false }) readonly showBlog!: boolean

  @Getter(ROOT_MODULE.getCategoriesRecord) readonly categoriesRecord!: TCategoriesRecord

  get categories() {
    return (this.data.categories || []).map((idCategory) => this.categoriesRecord[idCategory]).filter((category) => !!category)
  }

  get firstCategory() {
    return this.categories.length ? this.categories[0] : ({} as Category)
  }

  get firstCategoryNm() {
    return this.firstCategory?.title
  }

  get views() {
    return this.data!.meta!.view
  }

  get blog() {
    return this.data.blog_title
  }

  get time() {
    return this.$moment(this.data.meta!.timestamp).fromNow()
  }

  get slug() {
    return this.data.slug + FORMAT_SLUG
  }

  @Emit()
  handleRedirectArticleDetail() {
    this.$emit('on-redirect-article-detail', this.data)
  }

  @Emit()
  handleRedirectBlog() {
    this.$emit('on-redirect-blog', this.data.blog_slug)
  }

  @Emit()
  handleRedirectCategory() {
    this.$emit('on-redirect-category', this.firstCategory)
  }
}
</script>
<style></style>
