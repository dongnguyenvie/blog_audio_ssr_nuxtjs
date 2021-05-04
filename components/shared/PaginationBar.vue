<template>
  <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between pb-24">
    <div class="pb-5 sm:pb-0">
      <p class="text-sm leading-5 text-gray-700">
        Tổng cộng
        <span class="font-bold">{{ '{' + total + '}' }}</span>
        bài viết
      </p>
    </div>
    <Pagination :totalPages="totalPages" :total="total" :currentPage="currentPage" @on-page-change="handleChangePage" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import Pagination from '~/components/Pagination.vue'

@Component({
  components: {
    Pagination,
  },
})
export default class PaginationBar extends Vue {
  @Prop({ type: Number, default: 0 }) totalPages!: number
  @Prop({ type: Number, default: 0 }) total!: number
  @Prop({ type: Number, default: 1 }) currentPage!: number

  @Emit()
  handleChangePage(page: number) {
    this.$emit('on-page-change', page)
  }
}
</script>
