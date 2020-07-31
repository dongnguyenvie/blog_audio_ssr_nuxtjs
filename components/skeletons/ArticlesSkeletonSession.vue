<template>
  <section class="flex flex-wrap w-full">
    <div class="flex justify-between w-full">
      <h3 class="w-full block text-2xl pb-5 mx-2 font-medium">{{ title }}</h3>
      <div class="flex flex-no-wrap">
        <font-awesome-icon :icon="['fas', 'th-list']" class="text-4xl mx-1 text-gray-500 border-gray-300 border-2 p-1 cursor-pointer skeleton-box"></font-awesome-icon>
        <font-awesome-icon :icon="['fas', 'th']" class="text-4xl mx-1 text-gray-500 border-gray-300 border-2 p-1 cursor-pointer skeleton-box"></font-awesome-icon>
      </div>
    </div>
    <div v-if="isGird" class="w-full flex flex-wrap">
      <ArticleSkeletonBoxVue v-for="index in size" :key="`gird-${index}`" />
    </div>
    <div v-else class="w-full flex flex-col">
      <ArticleSkeletonFullBoxVue v-for="index in size" :key="`list-${index}`" />
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import ArticleSkeletonBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import ArticleSkeletonFullBoxVue from '~/components/skeletons/ArticleSkeletonFullBox.vue'

@Component({
  components: {
    ArticleSkeletonBoxVue,
    ArticleSkeletonFullBoxVue,
  },
})
export default class ArticlesSkeletonSession extends Vue {
  isGird = true

  @Prop({ type: String, default: '' }) readonly title!: string
  @Prop({ type: Number, default: 4 }) readonly size!: number
}
</script>
<style></style>
