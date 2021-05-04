<template>
  <section class="w-full scrolling-touch overflow-hidden">
    <h3 class="w-full block text-2xl pb-5 font-medium">Trending</h3>
    <div class="w-0">
      <div class="flex flex-no-wrap justify-between">
        <div v-for="index in 10" :key="index" class="flex flex-col items-center mx-1">
          <div class="rounded-full h-32 w-32 flex items-center justify-center skeleton-box"></div>
          <span class="text-gray-600">
            #####
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class TrendingSkeletonSession extends Vue {}
</script>
<style></style>
