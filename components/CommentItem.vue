<template>
  <div class="my-6">
    <div v-show="state === 'editing'">
      <div class="mb-3">
        <h3 class="text-black text-xl">Update Comment</h3>
      </div>
      <textarea v-model="commentUpdate" placeholder="Update comment" class="bg-grey-lighter rounded leading-normal resize-none w-full h-24 py-2 px-3">
      </textarea>
      <div class="flex flex-col md:flex-row items-center mt-2">
        <button class="border border-blue bg-blue text-white hover:bg-blue-dark py-2 px-4 rounded tracking-wide mb-2 md:mb-0 md:mr-1" @click="saveEdit">
          Update
        </button>
        <button
          class="border border-grey-darker text-grey-darker hover:bg-grey-dark hover:text-white py-2 px-4 rounded tracking-wide mb-2 md:mb-0 md:ml-1"
          @click="resetEdit"
        >
          Cancel
        </button>
        <button class="text-red hover:bg-red hover:text-white py-2 px-4 rounded tracking-wide mb-2 md:mb-0 md:ml-auto" @click="deleteComment">Delete</button>
      </div>
    </div>
    <div class="text-grey-dark leading-normal">
      <p>
        <span class="text-sm font-bold">{{ author.name }}</span> <span class="mx-1 text-sm">&bull;</span> {{ time }}
      </p>
    </div>
    <div class="flex justify-between mb-1">
      <p class="text-grey-darkest leading-normal text-sm">{{ comment.content }}</p>
      <button v-if="editable" @click="state = 'editing'" class="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm">Edit</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { Comment } from '~/types/comment'
import { User } from '~/types/user'

@Component
export default class CommentItem extends Vue {
  commentUpdate = ''
  state = ''
  editable = false

  @Prop({ type: Object, default: { author: {} } }) comment!: Comment
  @Prop({ type: Object, default: () => ({}), required: true }) currentUser!: User

  get author() {
    let author = {
      name: '',
    }
    try {
      let user = this.comment.user ? JSON.parse(this.comment.user) : ({} as any)
      author.name = user.name
    } catch (error) {}
    return author
  }

  get time() {
    return this.$moment(this.comment.timestamp).fromNow()
  }

  @Emit()
  handleComment(content: string) {
    this.$emit('on-comment', content)
  }

  @Emit()
  saveEdit() {}

  @Emit()
  resetEdit() {}

  @Emit()
  deleteComment() {}
}
</script>
<style></style>
