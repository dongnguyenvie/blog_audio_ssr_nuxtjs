<template>
  <div class="flex flex-wrap px-8">
    <!-- HashtagSession -->
    <HashtagSkeletonSessionVue v-if="isSkeltonLoading" class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200" />
    <HashtagSessionVue
      v-else
      :data="hashtags"
      :tagsSelected="tagsSelected"
      @onRedirectArticleDetail="handleRedirectArticleDetail"
      @on-selected="handleSelected"
      class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200"
    />
    <!-- HashtagSession -->

    <!-- Trendingsession -->
    <TrendingSkeletonSessionVue v-if="isSkeltonLoading" class="pt-6 pb-6" />
    <TrendingSessionVue v-else :data="trendingData" @onRedirectArticleDetail="handleRedirectArticleDetail" class="pt-6 pb-6" />
    <!-- Trendingsession -->

    <!-- ArticleSessionVue -->
    <ArticlesSkeletonSessionVue v-if="isSkeltonLoading || isLoadingRecommendData" title="Recommended" :size="8" class="pb-6 pt-6 border-t-2 border-gray-200" />
    <ArticleSessionVue
      v-else
      title="Recommended"
      :data="recommendData"
      show-category-nm
      @onRedirectArticleDetail="handleRedirectArticleDetail"
      class="pb-6 pt-6 border-t-2 border-gray-200"
    />
    <!-- ArticleSessionVue -->

    <ArticleSessionVue
      v-for="category in dynamicSessions"
      :key="category.id"
      :title="category.title"
      :data="category.articles"
      show-views
      class="pb-6 pt-6 border-t-2 border-gray-200"
      @onRedirectArticleDetail="handleRedirectArticleDetail"
    />
    <!-- <section class="flex flex-wrap w-full pb-6 pt-6 border-t-2 border-gray-200">
      <h3 class="w-full block text-2xl pb-5 mx-2 font-medium">Articles</h3>
      <ArticleSkeletonBoxVue v-for="index in 40" :key="index" />
    </section> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import HashtagSkeletonSessionVue from '~/components/skeletons/HashtagSkeletonSession.vue'
import ArticleSkeletonBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import TrendingSkeletonSessionVue from '~/components/skeletons/TrendingSkeletonSession.vue'
import ArticlesSkeletonSessionVue from '~/components/skeletons/ArticlesSkeletonSession.vue'
import HashtagSessionVue from '~/components/sessions/HashtagSession.vue'
import TrendingSessionVue from '~/components/sessions/TrendingSession.vue'
import { FORMAT_SLUG } from '~/utils/contants'
import { ISectionArticle } from '~/types/article'
import ArticleSessionVue from '~/components/sessions/ArticleSession.vue'
import { ICategory, ICategoryWithArticles } from '~/types/category'
import { ITag } from '~/types/tag'
import { HOME_MODULE, ROOT_MODULE, UI_MODULE } from '~/types/store'

@Component({
  async fetch({ store }) {
    await store.dispatch(HOME_MODULE.namespace + '/' + HOME_MODULE.actionFetchFirstData)
  },
  components: {
    HashtagSkeletonSessionVue,
    ArticleSkeletonBoxVue,
    TrendingSkeletonSessionVue,
    ArticlesSkeletonSessionVue,
    HashtagSessionVue,
    TrendingSessionVue,
    ArticleSessionVue,
  },
})
export default class HomePagePages extends Vue {
  @Getter(ROOT_MODULE.getCategories) categories!: ICategory[]
  @Getter(ROOT_MODULE.getTags) hashtags!: ITag[]
  @Getter(ROOT_MODULE.getTagsSelected) tagsSelected!: string[]
  @Getter(HOME_MODULE.getTrendingSessionData, { namespace: HOME_MODULE.namespace }) trendingData!: ISectionArticle[]
  @Getter(HOME_MODULE.getRecommendSessionData, { namespace: HOME_MODULE.namespace }) recommendData!: ISectionArticle[]
  @Getter(HOME_MODULE.getLoadingRecommendSessionData, { namespace: HOME_MODULE.namespace }) isLoadingRecommendData!: boolean
  @Getter(HOME_MODULE.getDynamicHomeSessions, { namespace: HOME_MODULE.namespace }) dynamicSessions!: ICategoryWithArticles[]
  @Getter(UI_MODULE.getSkeltonLoading, { namespace: UI_MODULE.namespace }) isSkeltonLoading!: boolean

  @Action(HOME_MODULE.actionFetchFirstData, { namespace: HOME_MODULE.namespace }) fetchFirstData!: () => void
  @Action(HOME_MODULE.actionFetchRecommendData, { namespace: HOME_MODULE.namespace }) fetchRecommendData!: () => void

  @Mutation(ROOT_MODULE.mutationSetTagsSelected) setTagsSelected!: (tagsSelected: string[]) => void
  @Mutation(UI_MODULE.mutationSetSkeltonLoading, { namespace: UI_MODULE.namespace }) changeSkletonLoading!: (flag: boolean) => void

  @Emit()
  handleRedirectArticleDetail(article: ISectionArticle) {
    this.$router.push({ name: 'slug', params: { slug: article.slug + FORMAT_SLUG } })
    console.log(`article`, article)
  }

  @Emit()
  handleSelected(tag: string) {
    const tagExistsFlg = this.tagsSelected.includes(tag)
    let tagsSelected = null
    if (tagExistsFlg) {
      tagsSelected = this.tagsSelected.filter((tagSelected: string) => tagSelected !== tag)
    } else {
      tagsSelected = [...this.tagsSelected, tag]
    }
    this.setTagsSelected(tagsSelected)
    this.fetchRecommendData()
  }

  @Emit()
  created() {
    setTimeout(() => {
      this.changeSkletonLoading(false)
    }, 1000)
  }

  mounted() {}
}
</script>

<style></style>
