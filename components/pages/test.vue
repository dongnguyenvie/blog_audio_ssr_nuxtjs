<template>
  <div>
    <client-only placeholder="Loading...">
      <vueAplayer
        theme="pic"
        shuffle
        repeat="list"
        show-lrc
        :music="{
          title: 'secret base~君がくれたもの~',
          artist: 'Silent Siren',
          src: 'https://data50.chiasenhac.com/downloads/366/4/365138-9456f911/128/Gucci%20Gucci%20Freestyle_%20-%20Lil%20Wayne.mp3',
          pic: 'https://afamilycdn.com/150157425591193600/2020/4/11/1-1586613852202361426918.jpg',
        }"
        :list="[
          {
            title: 'https://www.youtube.com/watch?v=aByObtNRKjo',
            artist: 'Silent Siren',
            src: 'https://drive.google.com/file/d/1NjZFmDCmkO1vDptCxZ7PP_yF8QqGtqjz/view',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
          },
          {
            title: 'secret base~君がくれたもの~',
            artist: 'Silent Siren',
            src: 'http://mp3ornot.com/songs/1A.mp3',
            pic: 'https://afamilycdn.com/150157425591193600/2020/4/11/1-1586613852202361426918.jpg',
          },
        ]"
      />
    </client-only>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'
import vueAplayer from '~/components/modules/vue-aplayer/vueAplayer.vue'

@Component({
  components: {
    vueAplayer,
  },
})
export default class Test extends Vue {
  get isBrowser() {
    return process.client
  }
}
</script>
