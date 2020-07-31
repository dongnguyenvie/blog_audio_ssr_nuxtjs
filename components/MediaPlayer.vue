<template>
  <section>
    <component :is="currentComponent" :data="data"></component>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { THashtag } from '~/types/tag'
import { ARTICLE_FORMAT } from '~/utils/contants'
import VideoPlayer from '~/components/shared/VideoPlayer.vue'
import AudioPlayer from '~/components/shared/AudioPlayer.vue'
import { IAudioResource } from '~/types/audio'

const ARTICLE_FORMAT_DEFAULT = 2
@Component({
  components: {
    VideoPlayer,
    AudioPlayer,
  },
})
export default class MediaPlayer extends Vue {
  @Prop({ type: Number, default: ARTICLE_FORMAT_DEFAULT }) type!: number
  @Prop({ type: Array }) data!: IAudioResource[] | string[]

  get currentComponent() {
    return ARTICLE_FORMAT[this.type].component
  }
}
</script>
<style></style>
