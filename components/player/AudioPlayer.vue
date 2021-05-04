<template>
  <div>
    <APlayer v-if="list.length" repeat="no-repeat" theme="#41b883" listMaxHeight="250px" show-lrc :list="list" :music="currentMusic || list[0]" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch, Ref } from 'nuxt-property-decorator'
import APlayer from '~/components/modules/vue-aplayer/vueAplayer.vue'
import { AudioResource } from '~/types/audio'

interface IAudio {
  src: string
  title?: string
  artist?: string
}

@Component({
  components: {
    APlayer,
  },
})
export default class AudioPlayer extends Vue {
  @Prop({ type: Array }) data!: AudioResource[]

  currentMusic: null | IAudio = null

  get list() {
    return (this.data || []).map((item) => {
      return {
        src: item.url,
        title: item.title ? item.title : this.handleGenerateTitle(item.url),
        artist: 'audiovyvy.com',
        pic: '#88dfb7',
      }
    })
  }

  @Emit()
  handleGenerateTitle(src: string) {
    const paths = src.split('/')
    return paths[paths.length - 1]
  }

  public mounted() {}
}
</script>
