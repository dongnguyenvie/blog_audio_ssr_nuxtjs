<template>
  <nuxt-link
    :to="{ name: $routeNames.articleDetailPage, params: { slug: slug } }"
    tag="a"
    class="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after translate-3d-none-after rounded"
  >
    <div
      class="flex flex-wrap relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after py-2 px-4 rounded border-2 border-gray-300"
    >
      <div class="w-full">
        <h4 class="text-xs whitespace-no-wrap">
          <span class="rounded-full h-6 w-6 inline-flex items-center justify-center bg-gray-200">
            <font-awesome-icon :icon="['fas', 'user']" class="text-sm text-blue-300"></font-awesome-icon>
          </span>
          <span class="font-bold text-gray-darkest"> Dong nguyen </span>
          <span> | {{ time }}</span>
        </h4>
      </div>
      <div class="flex flex-col flex-grow w-3/4 pt-1">
        <div class="text-left relative flex-grow">
          <h5 class="text-sm text-gray-darkest">
            <p class="w-full inline-block text-ellipsis">
              {{ data.content }}
            </p>
          </h5>
        </div>
      </div>
      <div class="relative group text-primary-500 w-1/4 pt-1">
        <div class="h-full">
          <p class="bg-gray-300 group-hover:scale-110 transition-transform transform-center block h-full">
            <img alt="Liên Thành Quyết - kiếm hiệp kim dung" title="Liên Thành Quyết - kiếm hiệp kim dung" :src="thumbnail" class="lazyLoad isLoaded" />
          </p>
        </div>
      </div>
      <div class="flex w-full">
        <span class="mr-5">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-sm text-gray-500"></font-awesome-icon>
          11
        </span>
        <span>
          <font-awesome-icon :icon="['fas', 'thumbs-down']" class="text-sm text-gray-500"></font-awesome-icon>
          11
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import { Comment } from '~/types/comment'
import { FORMAT_SLUG } from '~/utils/contants'

@Component
export default class CommentBox extends Vue {
  @Prop({ type: Object, required: true }) readonly data!: Comment

  get time() {
    return this.$moment(this.data.timestamp).fromNow()
  }

  get thumbnail() {
    return this.data.article_thumbnail || ''
  }

  get slug() {
    return this.data.article_slug + FORMAT_SLUG
  }
}
</script>
