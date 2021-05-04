<template>
  <div class="flex flex-wrap px-8">
    <HashtagSessionVue is-article class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200" :data="recommendArticleData" />
    <div class="flex flex-wrap">
      <div class="w-full lg:w-3/4 pr-4">
        <section class="border-t-2 border-gray-200 pt-3">
          <client-only placeholder="Loading...">
            <MediaPlayer :type="data.type" :data="resource" />
          </client-only>
        </section>
        <section class="flex flex-wrap w-full pt-3 pb-3 border-b-2 border-gray-200">
          <h1 class="w-full block mx-2 uppercase text-lg font-bold">{{ data.title }}</h1>
        </section>
        <section class="flex flex-wrap w-full pb-6 pt-2">
          <h4 class="w-full block">
            <nuxt-link
              v-for="category in categories"
              :key="category.id"
              :to="{ name: $routeNames.categoryDetailPage, params: { slug: category.slug, page: 1 } }"
              tag="a"
              >{{ category.title }}</nuxt-link
            >
          </h4>
          <p class="text-xs font-normal">
            <span>{{ views }} Lượt xem</span>
            <span class="ml-1">• {{ time }}</span>
          </p>
          <article v-html="data.content" class="mt-2"></article>
        </section>
        <div class="hidden lg:flex flex-col">
          <section>
            <CommentsManager @on-comment="handleComment" :currentUser="currentUser" />
          </section>
          <section v-show="isCommentFetched" ref="comment">
            <template v-if="isCommentLoading">
              <CommentItem v-for="(comment, index) in comments" :comment="comment" @on-comment="handleComment" :key="index" />
            </template>
            <div v-else>
              Đang tải comment ...
            </div>
          </section>
        </div>
      </div>
      <div class="w-full lg:w-1/4 flex-grow-0">
        <SidebarRightVue :data="relatedArticleData" />
      </div>
      <div class="w-full flex flex-col lg:hidden mt-6">
        <section>
          <CommentsManager @on-comment="handleComment" :currentUser="currentUser" />
        </section>
        <section>
          <CommentItem v-for="(comment, index) in comments" :comment="comment" @on-comment="handleComment" :key="index" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Ref } from 'nuxt-property-decorator'
import VueScrollTo from 'vue-scrollto'

import HashtagSessionVue from '~/components/sessions/HashtagSession.vue'
import SkeletonArticleBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import SidebarRightVue from '~/components/SidebarRight.vue'
import MediaPlayer from '~/components/MediaPlayer.vue'
import CommentsManager from '~/components/CommentsManager.vue'
import { FORMAT_SLUG, WS_TYPES } from '~/utils/contants'
import { seedDataArticleContent } from '~/mock/seed'
import CommentItem from '~/components/CommentItem.vue'
import { mapGetters, mapActions } from 'vuex'
import { IArticle } from '~/types/article'
import { Comment } from '~/types/comment'
import { TCategoriesRecord } from '~/types/category'
import { DETAIL_MODULE, ROOT_MODULE, SOCKET_MODULE, ARTICLE_MODULE, COMMENT_MODULE } from '~/types/store'
import { checkAndGetSlug, updateAudioWachedHistory } from '~/utils'
import { Debounce } from '~/utils/decorator'
import { Result } from '~/types/result'
import { User } from '~/types/user'

@Component({
  async asyncData({ store, params, error }) {
    const url = params.slug
    const slug = checkAndGetSlug(url)
    let data
    let recommendArticleData = []
    let relatedArticleData = []
    data = await store.dispatch(ARTICLE_MODULE.namespace + '/' + ARTICLE_MODULE.actionFetchArticleWithSlug, slug)
    try {
      recommendArticleData = await store.dispatch(ARTICLE_MODULE.namespace + '/' + ARTICLE_MODULE.actionFetchRandomArticleData)
      relatedArticleData = await store.dispatch(ARTICLE_MODULE.namespace + '/' + ARTICLE_MODULE.actionFetchRandomArticleDataWithCategories, data.categories)
    } catch (error) {}
    if (!data) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    return {
      data,
      recommendArticleData,
      relatedArticleData,
    }
  },
  components: {
    HashtagSessionVue,
    SkeletonArticleBoxVue,
    SidebarRightVue,
    MediaPlayer,
    CommentsManager,
    CommentItem,
  },
})
export default class ArticleDetailPage extends Vue {
  recommendArticleData!: IArticle[]
  relatedArticleData!: IArticle[]
  data!: IArticle
  commentsData: Comment[] = []
  isCommentFetched = false
  isCommentLoading = false

  @Ref('comment') readonly commentRef!: HTMLElement

  @Getter(ROOT_MODULE.getCategoriesRecord) categoriesRecord!: TCategoriesRecord
  @Getter(ROOT_MODULE.getUser) currentUser!: User
  @Getter(SOCKET_MODULE.getId, { namespace: SOCKET_MODULE.namespace }) idWs!: string

  @Action(SOCKET_MODULE.actionSocketSendMessage, { namespace: SOCKET_MODULE.namespace }) onSocketEmit!: (payload: any) => void
  @Action(COMMENT_MODULE.actionFetchCommentsOfArticle, { namespace: COMMENT_MODULE.namespace }) onFetchCommentsOfArticle!: (payload: {
    articleId: string
  }) => Promise<Result & { results: Comment[] }>

  get categories() {
    return (this.data.categories || []).map((idCategory) => this.categoriesRecord[idCategory])
  }

  get views() {
    return this.data?.meta?.view
  }
  get time() {
    return this.$moment(this.data?.meta?.timestamp).fromNow()
  }
  get link() {
    return this.data.slug + FORMAT_SLUG
  }
  get resource() {
    try {
      return JSON.parse(this.data.resource)
    } catch (error) {
      return {}
    }
  }
  get comments() {
    return this.commentsData.map((comment) => ({
      ...comment,
    }))
  }

  @Emit()
  syncTopWachingStory(payload: any) {
    this.onSocketEmit(payload)
  }

  @Emit()
  @Debounce(500)
  async handleScroll(ev: Event) {
    const wT = window.innerHeight * (window.innerHeight / document.body.offsetHeight) + window.scrollY
    const elT = this.commentRef.offsetTop
    if (wT > elT - 100 && !this.isCommentFetched) {
      this.isCommentFetched = true
      const commentResult = await this.onFetchCommentsOfArticle({ articleId: this.data.id })
      if (commentResult.results.length) {
        this.commentsData = commentResult.results
      }
      setTimeout(() => {
        this.isCommentLoading = true
      }, 500)
    }
  }

  @Emit()
  handleComment(content: string) {
    console.log(`content`, content)
  }

  async mounted() {
    updateAudioWachedHistory(this, this.data)
    if (process.client) {
      ;(window as any).haha = this

      VueScrollTo.scrollTo('#__nuxt', 0, { force: true })
      window.addEventListener('scroll', this.handleScroll)
    }
    setTimeout(() => {
      const { id, title, slug, categories, blog, tags, thumbnail } = this.data
      if (!this.idWs || !id) {
        return
      }
      this.syncTopWachingStory({
        clientType: WS_TYPES.ACTIONS.TRACKING_WATCH_AUDIO,
        data: {
          idWs: this.idWs,
          id,
          title,
          slug,
          categories,
          blog,
          tags,
          thumbnail,
        },
      })
    }, 2000)
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style></style>
