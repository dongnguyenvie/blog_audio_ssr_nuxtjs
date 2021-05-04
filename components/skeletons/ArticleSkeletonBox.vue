<template>
  <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
    <a class="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after card translate-3d-none-after rounded border border-gray-300">
      <div class="relative group text-primary-500" style="padding-top: 70%;">
        <div class="absolute top-0 left-0 h-full w-full">
          <span class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full"></span>
        </div>
      </div>
      <div class="flex flex-col flex-grow">
        <div class="pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow">
          <h4 class="text-lg font-bold text-gray-darkest mr-10">
            <span class="skeleton-box h-5 w-1/6 inline-block"></span>
            <span class="skeleton-box h-5 w-1/2 inline-block"></span>
            <span class="skeleton-box h-5 w-2/4 inline-block"></span>
            <span class="skeleton-box h-5 w-2/5 inline-block"></span>
          </h4>
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class ArticleSkeletonBox extends Vue {}
</script>
<style></style>
