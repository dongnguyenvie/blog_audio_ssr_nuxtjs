<template>
  <div class="flex flex-wrap w-full">
    <SkeletonArticleFullBoxVue
      v-for="(article, index) in [
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
      ]"
      :key="`list-${article.id}${index}`"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import SkeletonArticleFullBoxVue from '~/components/skeletons/ArticleSkeletonFullBox.vue'

@Component({
  components: {
    SkeletonArticleFullBoxVue,
  },
})
export default class SidebarRight extends Vue {
  isGird = true

  @Prop({ type: String, default: '' }) readonly title!: string

  @Emit()
  handleToggle(flg?: boolean) {
    if (typeof flg === 'undefined') {
      this.isGird = !this.isGird
      return
    }
    this.isGird = flg
  }
}
</script>
<style></style>
