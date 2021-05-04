<template>
  <div>
    <nav class="relative z-0 inline-flex shadow-sm">
      <a
        href="#"
        :class="[
          'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150',
          {
            'cursor-not-allowed': isInFirstPage,
          },
        ]"
        @click.prevent="handleClickFirstPage"
      >
        First
      </a>
      <a
        href="#"
        :class="[
          'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150',
          {
            'cursor-not-allowed': isInFirstPage,
          },
        ]"
        @click.prevent="handleClickPreviousPage"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </a>

      <a
        v-for="page in pages"
        href="#"
        :class="[
          '-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150',
          {
            'cursor-not-allowed font-bold bg-blue-400 text-red-100 hover:text-red-100': page.isDisabled,
          },
        ]"
        @click.prevent="handleClickPage(page)"
        :disabled="page.isDisabled"
        :key="page.name"
      >
        {{ page.name }}
      </a>

      <a
        href="#"
        :class="[
          '-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150',
          {
            'cursor-not-allowed': isInLastPage,
          },
        ]"
        @click.prevent="handleClickNextPage"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
      <a
        href="#"
        :class="[
          '-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150',
          {
            'cursor-not-allowed': isInLastPage,
          },
        ]"
        @click.prevent="handleClickLastPage"
      >
        Last
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop({ type: Number, default: 3 }) maxVisibleButtons!: number
  @Prop({ type: Number, required: true }) totalPages!: number
  @Prop({ type: Number, required: true }) total!: number
  @Prop({ type: Number, required: true }) currentPage!: number

  get startPage() {
    // When on the first page
    if (this.currentPage === 1) {
      return 1
    }
    // When on the last page
    if (this.currentPage === this.totalPages) {
      const currentPage = this.totalPages - (this.maxVisibleButtons - 1)
      return currentPage <= 0 ? 1 : currentPage
    }
    // When in between
    return this.currentPage - 1
  }

  get pages(): { isDisabled: boolean; name: number }[] {
    const range = []
    for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i += 1) {
      range.push({
        name: i,
        isDisabled: i === this.currentPage,
      })
    }
    return range
  }

  get isInFirstPage() {
    return this.currentPage === 1
  }
  get isInLastPage() {
    return this.currentPage === this.totalPages
  }

  @Emit()
  handleClickPage(page: { isDisabled: boolean; name: number }) {
    if (page.isDisabled) {
      return
    }
    this.$emit('on-page-change', page.name)
  }

  @Emit()
  handleClickFirstPage() {
    if (this.isInFirstPage) {
      return
    }
    this.$emit('on-page-change', 1)
  }

  @Emit()
  handleClickPreviousPage() {
    if (this.isInFirstPage) {
      return
    }
    this.$emit('on-page-change', this.currentPage - 1)
  }

  @Emit()
  handleClickNextPage() {
    if (this.isInLastPage) {
      return
    }
    this.$emit('on-page-change', this.currentPage + 1)
  }

  @Emit()
  handleClickLastPage() {
    if (this.isInLastPage) {
      return
    }
    this.$emit('on-page-change', this.totalPages)
  }
}
</script>
