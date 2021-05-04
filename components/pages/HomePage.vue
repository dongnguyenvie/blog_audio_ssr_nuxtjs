<template>
  <div class="flex flex-wrap px-8">
    <!-- HashtagSession -->
    <HashtagSkeletonSessionVue v-if="isLoading" class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200" />
    <HashtagSessionVue
      v-else
      :data="hashtags"
      :tagsSelected="tagsSelected"
      @on-redirect-article-detail="handleRedirectArticleDetail"
      @on-selected="handleSelected"
      class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200"
    />
    <!-- HashtagSession -->

    <!-- Trendingsession -->
    <TrendingSkeletonSessionVue v-if="isLoading" class="pt-6 pb-6" />
    <TrendingSessionVue v-else :data="trendingData" @on-redirect-article-detail="handleRedirectArticleDetail" class="pt-6 pb-6" />
    <!-- Trendingsession -->

    <!-- ArticleSessionVue -->
    <ArticlesSkeletonSessionVue v-if="isLoading || isLoadingRecommendData" title="Recommended" :size="12" class="pb-6 pt-6 border-t-2 border-gray-200" />
    <ArticleSessionVue
      v-else
      title="Recommended"
      :data="recommendData"
      show-category-nm
      @on-redirect-article-detail="handleRedirectArticleDetail"
      @on-redirect-blog="handleRedirectBlog"
      @on-redirect-category="handleRedirectCategory"
      class="pb-6 pt-6"
    />

    <!-- CommentSession -->
    <CommentSession v-if="commentData.length" :data="commentData" class="pb-6 pt-6 border-t-2 border-gray-200" />
    <!-- CommentSession -->

    <!-- dynamicSessions -->
    <ArticleSessionVue
      v-for="category in dynamicSessions"
      :key="category.id"
      :title="category.title"
      :data="category.articles"
      show-views
      class="pb-6 pt-6 border-t-2 border-gray-200"
      @on-redirect-article-detail="handleRedirectArticleDetail"
      @on-redirect-blog="handleRedirectBlog"
      @on-redirect-category="handleRedirectCategory"
    />
    <!-- dynamicSessions -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import HashtagSkeletonSessionVue from '~/components/skeletons/HashtagSkeletonSession.vue'
import HashtagSessionVue from '~/components/sessions/HashtagSession.vue'
import ArticleSkeletonBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import ArticleSessionVue from '~/components/sessions/ArticleSession.vue'
import TrendingSkeletonSessionVue from '~/components/skeletons/TrendingSkeletonSession.vue'
import ArticlesSkeletonSessionVue from '~/components/skeletons/ArticlesSkeletonSession.vue'
import TrendingSessionVue from '~/components/sessions/TrendingSession.vue'
import CommentSession from '~/components/sessions/CommentSession.vue'
import { FORMAT_SLUG } from '~/utils/contants'
import { SectionArticle } from '~/types/article'
import { Category, CategoryWithArticles } from '~/types/category'
import { Tag } from '~/types/tag'
import { HOME_MODULE, ROOT_MODULE, UI_MODULE, COMMENT_MODULE } from '~/types/store'
import { Comment } from '~/types/comment'
import { Result } from '~/types/result'

@Component({
  scrollToTop: true,
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
    CommentSession,
  },
})
export default class HomePagePage extends Vue {
  commentData: Comment[] = []

  @Getter(ROOT_MODULE.getCategories) categories!: Category[]
  @Getter(ROOT_MODULE.getTags) hashtags!: Tag[]
  @Getter(ROOT_MODULE.getTagsSelected) tagsSelected!: string[]
  @Getter(HOME_MODULE.getTrendingSessionData, { namespace: HOME_MODULE.namespace }) trendingData!: SectionArticle[]
  @Getter(HOME_MODULE.getRecommendSessionData, { namespace: HOME_MODULE.namespace }) recommendData!: SectionArticle[]
  @Getter(HOME_MODULE.getLoadingRecommendSessionData, { namespace: HOME_MODULE.namespace }) isLoadingRecommendData!: boolean
  @Getter(HOME_MODULE.getDynamicHomeSessions, { namespace: HOME_MODULE.namespace }) dynamicSessions!: CategoryWithArticles[]
  @Getter(UI_MODULE.getSkeltonLoading, { namespace: UI_MODULE.namespace }) isSkeltonLoading!: boolean
  @Getter(UI_MODULE.getNextPage, { namespace: UI_MODULE.namespace }) targetPageNm!: string

  @Action(HOME_MODULE.actionFetchFirstData, { namespace: HOME_MODULE.namespace }) onFetchFirstData!: () => void
  @Action(HOME_MODULE.actionFetchRecommendData, { namespace: HOME_MODULE.namespace }) onFetchRecommendData!: () => void
  @Action(COMMENT_MODULE.actionFetchNewComments, { namespace: COMMENT_MODULE.namespace }) onFetchNewsComments!: () => Promise<Result & { results: Comment[] }>

  @Mutation(ROOT_MODULE.mutationSetTagsSelected) onSetTagsSelected!: (tagsSelected: string[]) => void
  @Mutation(UI_MODULE.mutationSetSkeltonLoading, { namespace: UI_MODULE.namespace }) onChangeSkletonLoading!: (flag: boolean) => void

  @Emit()
  handleRedirectArticleDetail(article: SectionArticle) {
    this.$router.push({ name: this.$routeNames.articleDetailPage, params: { slug: article.slug + FORMAT_SLUG } })
    console.log(`article`, article)
  }

  @Emit()
  handleRedirectBlog(slug: string) {
    this.$router.push({ name: this.$routeNames.blogDetailPage, params: { slug: slug, page: '1' } })
  }

  @Emit()
  handleRedirectCategory(category: Category) {
    this.$router.push({ name: this.$routeNames.categoryDetailPage, params: { slug: category.slug, page: '1' } })
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
    this.onSetTagsSelected(tagsSelected)
    this.onFetchRecommendData()
  }

  get isCurrentPage() {
    return this.targetPageNm === this.$routeNames.homePage
  }

  get isLoading() {
    return this.isSkeltonLoading && this.isCurrentPage
  }

  created() {
    setTimeout(() => {
      this.onChangeSkletonLoading(false)
    }, 1000)
  }

  async mounted() {
    ;(window as any).dongdong = this
    const commentResult = await this.onFetchNewsComments()
    if (commentResult.results.length) {
      this.commentData = commentResult.results
    }
  }
}
</script>

<style></style>
