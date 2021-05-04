<template>
  <div class="flex justify-between w-full">
    <h3 v-if="title" class="w-full block text-2xl pb-5 mx-2 font-medium">{{ title }}</h3>
    <div class="flex flex-no-wrap">
      <font-awesome-icon
        :icon="['fas', 'th-list']"
        :class="[
          'text-4xl mx-1 border-2 p-1 cursor-pointer border-gray-300 text-gray-500',
          {
            'border-gray-500': !isGird,
            'text-gray-700': !isGird,
          },
        ]"
        @click="handleToggle(false)"
      ></font-awesome-icon>
      <font-awesome-icon
        :icon="['fas', 'th']"
        :class="[
          'text-4xl mx-1 border-2 p-1 cursor-pointer border-gray-300 text-gray-500',
          {
            'border-gray-500': isGird,
            'text-gray-700': isGird,
          },
        ]"
        @click="handleToggle(true)"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import ArticleBoxVue from '~/components/ArticleBox.vue'
import ArticleFullBoxVue from '~/components/ArticleFullBox.vue'
import NoDataBoxVue from '~/components/box/NoDataBox.vue'

@Component
export default class SessionHeadTag extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, required: true }) isGird!: boolean

  @Emit()
  handleToggle(flg?: boolean) {
    this.$emit('on-toggle', flg)
  }
}
</script>
<style></style>
