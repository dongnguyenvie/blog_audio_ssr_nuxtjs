<template>
  <div class="rounded shadow-sm p-8 mb-4 bg-gray-100">
    <div class="mb-4">
      <h2 class="text-black">Comments</h2>
    </div>
    <textarea placeholder="Add a comment" class="bg-grey-lighter rounded leading-normal resize-none w-full h-10 py-2 px-3"> </textarea>
    <div class="mt-3">
      <button class="border border-blue bg-gray-400 text-white hover:bg-blue-dark py-2 px-4 rounded tracking-wide mr-1">Save</button>
      <button class="border border-gray-100 text-grey-darker py-2 px-4 rounded tracking-wide ml-1">Cancel</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class CommentSession extends Vue {
  state = {}
}
</script>
<style></style>
