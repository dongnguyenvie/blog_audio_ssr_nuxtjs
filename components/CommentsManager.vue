<template>
  <div class="rounded shadow-sm p-8 mb-4 bg-gray-100">
    <div class="mb-4">
      <h3 class="text-black text-lg">
        Bình luận
        <span>
          với tên:
          <input v-model="currentUser.name" :disabled="currentUser.isLogin" class="border-gray-200 border-2 w-full px-3 py-1 font-bold text-blue-700" />
        </span>
      </h3>
    </div>
    <textarea
      v-model="content"
      rows="3"
      placeholder="Add a comment"
      class="border-gray-200 bg-grey-lighter rounded leading-normal resize-none w-full py-2 px-3"
    >
    </textarea>
    <div class="mt-3">
      <button class="border border-blue bg-gray-400 text-white hover:bg-blue-dark py-2 px-4 rounded tracking-wide mr-1">Save</button>
      <button class="border border-gray-100 text-grey-darker py-2 px-4 rounded tracking-wide ml-1">Cancel</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import { User } from '~/types/user'

@Component
export default class CommentsManager extends Vue {
  content = ''

  @Prop({ type: Object, default: () => ({}) }) currentUser!: User

  @Emit()
  handleComment() {
    this.$emit('on-comment', this.content)
  }
}
</script>
<style></style>
