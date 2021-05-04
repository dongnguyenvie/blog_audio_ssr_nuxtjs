<template>
  <section>
    <div class="w-full scrolling-touch overflow-x-auto scrollbar-x-bar h-16">
      <div class="w-0">
        <div v-if="!isArticle" class="flex items-center flex-no-wrap">
          <span
            v-for="hashtag in data"
            :key="hashtag.id"
            :class="[
              'inline-block whitespace-no-wrap py-2 px-4 mx-2 w-auto rounded-full cursor-pointer',
              {
                'bg-gray-700 hover:bg-gray-700 text-white': tagsSelected.includes(hashtag.id),
                'bg-gray-400 text-gray-800 hover:bg-gray-700 hover:text-white': !tagsSelected.includes(hashtag.id),
              },
            ]"
            @click="handleSelected(hashtag.id)"
          >
            # {{ hashtag.title }}
          </span>
        </div>
        <div v-else class="flex items-center flex-no-wrap">
          <nuxt-link
            v-for="article in data"
            :key="article.id"
            :to="{ name: $routeNames.articleDetailPage, params: { slug: article.slug + '.html' } }"
            tag="a"
            class="inline-block whitespace-no-wrap py-2 px-4 mx-2 w-auto rounded-full cursor-pointer bg-gray-400 text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            {{ article.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { THashtag } from '~/types/tag'
import { IArticle } from '~/types/article'

@Component
export default class HashtagSession extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: THashtag | IArticle[]
  @Prop({ type: Array, default: () => [] }) readonly tagsSelected!: string[]
  @Prop({ type: Boolean, default: false }) readonly isArticle!: boolean

  @Emit()
  handleSelected(tag: string) {
    this.$emit('on-selected', tag)
  }

  mounted() {}
}
</script>
<style></style>
