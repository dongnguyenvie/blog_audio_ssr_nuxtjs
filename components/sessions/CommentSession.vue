<template>
  <section class="flex flex-wrap w-full">
    <h3 class="w-full block text-2xl pb-5 font-medium">Bình luận mới nhất</h3>
    <div class="flex flex-wrap w-full">
      <CommentBox v-for="comment in data" :data="comment" :key="comment.id" class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import CommentBox from '~/components/box/CommentBox.vue'
import { Comment } from '~/types/comment'

@Component({
  components: {
    CommentBox,
  },
})
export default class CommentSession extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: Comment[]

  mounted() {}
}
</script>
