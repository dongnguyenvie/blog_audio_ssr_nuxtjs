<template>
  <section>
    <div class="w-full scrolling-touch overflow-x-auto scrollbar-x-bar h-16">
      <div style="contain: size;" class="w-full">
        <div class="flex items-center flex-no-wrap">
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
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { THashtag } from '~/types/tag'

@Component
export default class HashtagSession extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: THashtag
  @Prop({ type: Array, required: true, default: [] }) readonly tagsSelected!: string[]

  @Emit()
  handleSelected(tag: string) {
    this.$emit('on-selected', tag)
  }
}
</script>
<style></style>
