<template>
  <div class="flex flex-wrap px-8">
    <HashtagSessionVue class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200" :data="hashtagData" />
    <div class="flex flex-wrap">
      <div class="w-full lg:w-3/4 pr-4">
        <section class="border-t-2 border-gray-200 pt-3">
          <client-only placeholder="Loading...">
            <MediaPlayerVue :type="data.type" :data="resource" />
          </client-only>
        </section>
        <section class="flex flex-wrap w-full pt-3 pb-3 border-b-2 border-gray-200">
          <h1 class="w-full block mx-2 uppercase text-lg font-bold">{{ data.title }}</h1>
        </section>
        <section class="flex flex-wrap w-full pb-6 pt-2">
          <h4 class="w-full block">{{ categoriesNm.join(', ') }}</h4>
          <p class="text-xs font-normal">
            <span>{{ views }} Lượt xem</span>
            <span class="ml-1">• {{ time }}</span>
          </p>
          <article v-html="data.content" class="mt-2"></article>
        </section>
        <div class="hidden lg:flex flex-col">
          <section>
            <CommentsManagerVue />
          </section>
          <section>
            <CommentItemVue v-for="(comment, index) in seedDataComments" :comment="comment" :key="index" />
          </section>
        </div>
      </div>
      <div class="w-full lg:w-1/4 flex-grow-0">
        <SidebarRightVue />
      </div>
      <div class="w-full flex flex-col lg:hidden mt-6">
        <section>
          <CommentsManagerVue />
        </section>
        <section>
          <CommentItemVue v-for="(comment, index) in seedDataComments" :comment="comment" :key="index" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import HashtagSessionVue from '~/components/skeletons/HashtagSkeletonSession.vue'
import SkeletonArticleBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import SidebarRightVue from '~/components/SidebarRight.vue'
import MediaPlayerVue from '~/components/MediaPlayer.vue'
import CommentsManagerVue from '~/components/CommentsManager.vue'
import { recommendData, hashtagData, seedDataComments } from '~/mock/seed'
import { FORMAT_SLUG, WS_TYPES } from '~/utils/contants'
import { seedDataArticleContent } from '~/mock/seed'
import CommentItemVue from '~/components/CommentItem.vue'
import { mapGetters, mapActions } from 'vuex'
import { IArticle } from '~/types/article'
import { TCategoriesRecord } from '~/types/category'
import { DETAIL_MODULE, ROOT_MODULE, SOCKET_MODULE } from '~/types/store'

@Component({
  async fetch({ store, params }) {
    const url = params.slug
    let flgSuccess = true
    if (url.endsWith(FORMAT_SLUG)) {
      const slug = url.slice(0, url.length - FORMAT_SLUG.length)
      // this.slug = slug
      flgSuccess = await store.dispatch(DETAIL_MODULE.namespace + '/' + DETAIL_MODULE.actionFetchArticleData, slug)
    }
    if (flgSuccess) {
      // console.log(`flgSuccess`, flgSuccess)
    }
  },
  components: {
    HashtagSessionVue,
    SkeletonArticleBoxVue,
    SidebarRightVue,
    MediaPlayerVue,
    CommentsManagerVue,
    CommentItemVue,
  },
})
export default class ArticleDetailPage extends Vue {
  seedDataComments = seedDataComments
  hashtagData = hashtagData

  @Getter(DETAIL_MODULE.getArticleData, { namespace: 'detail' }) data!: IArticle
  @Getter(ROOT_MODULE.getCategoriesRecord) categoriesRecord!: TCategoriesRecord
  @Getter(SOCKET_MODULE.getId, { namespace: 'socket' }) idWs!: string

  @Action(SOCKET_MODULE.actionSocketSendMessage, { namespace: 'socket' }) socketEmit!: (payload: any) => void

  get categoriesNm() {
    return (this.data.categories || []).map((idCategory) => this.categoriesRecord[idCategory].title)
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

  @Emit()
  syncTopWachingStory(payload: any) {
    this.socketEmit(payload)
  }

  mounted() {
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
}
</script>

<style></style>
