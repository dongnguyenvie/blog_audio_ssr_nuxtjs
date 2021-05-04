<template>
  <section class="w-full max-w-full">
    <h3 class="w-full block text-2xl pb-5 font-medium">Trending</h3>
    <div class="scrolling-touch overflow-x-scroll scrollbar-x-bar" style="overflow-x: scroll;">
      <div v-if="data.length" class="w-0">
        <div class="flex flex-no-wrap justify-between pb-4">
          <div
            v-for="article in data"
            :key="article.id"
            class="items-center mx-1 cursor-pointer inline-block flex-auto"
            @click="handleRedirectArticleDetail(article)"
            :title="article.title"
          >
            <div
              class="rounded-full h-32 w-32 flex items-center justify-center overflow-hidden border-gray-600 border-2 border-opacity-0 hover:border-opacity-25 bg-gray-300"
            >
              <img :data-src="article.thumbnail" class="w-full" :alt="article.title" :title="article.title" v-lazy-load />
            </div>
            <h4 class="whitespace-no-wrap w-32 inline-block overflow-hidden text-center" style="text-overflow: ellipsis;">
              {{ article.title }}
            </h4>
          </div>
        </div>
      </div>
      <div v-else class="h-24 pb-3">
        <NoDataBoxVue />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { TTrendingList, SectionArticle } from '~/types/article'
import NoDataBoxVue from '~/components/box/NoDataBox.vue'

@Component({
  components: {
    NoDataBoxVue,
  },
})
export default class TrendingSession extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: TTrendingList

  @Emit()
  handleRedirectArticleDetail(article: SectionArticle) {
    this.$emit('on-redirect-article-detail', article)
  }
}
</script>
<style></style>
