<template>
  <div class="flex flex-wrap w-full">
    <ArticleListBox v-for="article in data" :data="article" classTitle="font-normal text-sm" class="font-normal text-sm" :key="article.id" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import { IArticle } from '~/types/article'
import ArticleListBox from '~/components/box/ArticleListBox.vue'

@Component({
  components: {
    ArticleListBox,
  },
})
export default class SidebarRight extends Vue {
  isGird = true

  @Prop({ type: Array, default: () => [] }) data!: IArticle[]
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
