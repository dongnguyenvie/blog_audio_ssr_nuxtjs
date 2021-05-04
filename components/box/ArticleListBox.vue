<template>
  <div class="w-full py-2">
    <div
      class="flex flex-no-wrap relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after rounded pb-4 border-b-2 border-gray-300"
    >
      <div class="relative group text-primary-500 w-1/4 h-full">
        <div class="top-0 left-0 h-full">
          <nuxt-link
            :to="{ name: $routeNames.articleDetailPage, params: { slug: slug } }"
            tag="a"
            class="bg-gray-300 group-hover:scale-110 transition-transform transform-center block h-full"
          >
            <img :data-src="data.thumbnail" :alt="data.title" :title="data.title" v-lazy-load />
          </nuxt-link>
        </div>
      </div>
      <div class="flex flex-col flex-grow w-3/4">
        <div class="pl-2 pr-4 pt-0 mb-4 text-left relative flex-grow">
          <h4
            :class="{
              'text-lg font-bold text-gray-darkest mr-10': !classTitle,
              [classTitle]: !!classTitle,
            }"
          >
            <nuxt-link :to="{ name: $routeNames.articleDetailPage, params: { slug: slug } }" tag="a" class="w-full inline-block">
              {{ data.title }}
            </nuxt-link>
            <template v-if="showCategoryNm && categories.length">
              <nuxt-link
                v-for="category in categories"
                :key="category.id"
                :to="{ name: $routeNames.categoryDetailPage, params: { slug: category.slug, page: 1 } }"
                tag="a"
                class="text-sm font-normal inline-block mr-3"
              >
                | {{ category.title }}
              </nuxt-link>
            </template>
            <nuxt-link
              v-else-if="showBlog"
              :to="{ name: $routeNames.blogDetailPage, params: { slug: data.blog_slug, page: 1 } }"
              tag="a"
              class="h-5 w-full inline-block text-sm text-gray-700 font-normal"
            >
              {{ blog }} <font-awesome-icon class="text-xs fill-current text-blue-400" :icon="['fas', 'check-circle']"></font-awesome-icon>
            </nuxt-link>
            <p v-if="showDescription" class="w-full inline-block">
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
export default class ArticleListBox extends Vue {
  @Prop({ type: Object, required: true, default: () => ({}) }) readonly data!: SectionArticle
  @Prop({ type: Boolean, required: false, default: false }) readonly showCategoryNm!: boolean
  @Prop({ type: Boolean, required: false, default: false }) readonly showViews!: boolean
  @Prop({ type: Boolean, required: false, default: false }) readonly showDescription!: boolean
  @Prop({ type: Boolean, required: false, default: false }) readonly showBlog!: boolean
  @Prop({ type: String, default: '' }) readonly classTitle!: string

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
  handleRedirectArticleDetail(article: SectionArticle) {
    this.$emit('on-redirect-article-detail', article)
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
