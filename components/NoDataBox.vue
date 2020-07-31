<template>
  <div class="w-full h-full">
    <div class="h-full flex justify-center flex-col items-center bg-gray-100">
      <font-awesome-icon class="text-4xl fill-current text-gray-400" :icon="['fas', 'exclamation-circle']"></font-awesome-icon>
      <span class="text-gray-500">
        No Data
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class NoDataBox extends Vue {}
</script>
<style></style>
