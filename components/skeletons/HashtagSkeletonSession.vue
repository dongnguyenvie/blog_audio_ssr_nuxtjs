<template>
  <section>
    <div class="w-full scrolling-touch overflow-x-auto scrollbar-x-bar h-16">
      <div style="contain: size;" class="w-full">
        <div class="flex items-center flex-no-wrap">
          <span
            v-for="index in 10"
            :key="index"
            class="inline-block text-center whitespace-no-wrap bg-gray-400 text-gray-800 hover:bg-gray-700 hover:text-white py-2 px-4 mx-2 rounded-full w-48 h-8"
          >
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class HashtagSkeletonSession extends Vue {}
</script>
<style></style>
