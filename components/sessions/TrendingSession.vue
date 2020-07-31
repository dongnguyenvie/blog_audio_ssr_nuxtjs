<template>
  <section class="w-full scrolling-touch overflow-hidden">
    <h3 class="w-full block text-2xl pb-5 font-medium">Trending</h3>
    <div style="contain: size;" class="h-48 w-full">
      <template v-if="data.length">
        <div class="w-full flex h-48 flex-no-wrap justify-between">
          <div
            v-for="article in data"
            :key="article.id"
            class="flex flex-col items-center mx-1 cursor-pointer"
            @click="handleRedirectArticleDetail(article)"
            :title="article.title"
          >
            <div class="rounded-full h-32 w-32 flex items-center justify-center overflow-hidden border-gray-600 border-2 border-opacity-0 hover:border-opacity-25 bg-gray-300">
              <img :src="article.thumbnail" class="w-full" :alt="article.title" />
            </div>
            <h4 class="whitespace-no-wrap w-32 inline-block overflow-hidden text-center" style="text-overflow: ellipsis;">
              {{ article.title }}
            </h4>
          </div>
        </div>
      </template>
      <template v-else>
        <NoDataBoxVue />
      </template>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { TTrendingList, ISectionArticle } from '~/types/article'
import NoDataBoxVue from '~/components/NoDataBox.vue'

@Component({
  components: {
    NoDataBoxVue,
  },
})
export default class TrendingSession extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: TTrendingList

  @Emit()
  handleRedirectArticleDetail(article: ISectionArticle) {
    this.$emit('onRedirectArticleDetail', article)
  }
}
</script>
<style></style>
