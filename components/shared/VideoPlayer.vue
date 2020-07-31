<template>
  <div>
    <video controls="" class="w-full">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch, Ref } from 'nuxt-property-decorator'

@Component
export default class VideoPlayer extends Vue {}
</script>
