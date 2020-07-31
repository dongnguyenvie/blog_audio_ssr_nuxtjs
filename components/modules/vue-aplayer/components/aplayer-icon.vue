<template>
  <!-- <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" :viewBox="svg.viewBox" width="100%" :style="style">
    <use xlink:href="#aplayer-${type}"></use>
    <path class="aplayer-fill" :d="svg.d"></path>
  </svg> -->
  <img :src="svg" :style="style" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'

const requireAssets = require.context('../assets', false, /\.svg$/)
const SVGs = requireAssets.keys().reduce((svgs, path: string) => {
  const inlineSvg = requireAssets(path)
  svgs[path.match(/^.*\/(.+?)\.svg$/)![1]] = inlineSvg
  return svgs
}, {} as Record<string, string>)

@Component
export default class AplayerIcon extends Vue {
  @Prop({ type: String }) type!: string

  get svg() {
    let icon = this.type
    if (this.type === 'prev' || this.type === 'next') {
      icon = 'skip'
    }
    return SVGs[this.type] || {}
  }
  get style() {
    if (this.type === 'next') {
      return {
        transform: 'rotate(180deg)',
      }
    }
    return {}
  }
}
</script>
<style lang="scss"></style>
