<template>
  <div class="aplayer-lrc">
    <div class="aplayer-lrc-contents" :style="transformStyle">
      <p v-for="(line, index) of lrcLines" :key="index" :class="{ 'aplayer-lrc-current': index === currentLineIndex }">
        {{ line[1] }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'
import { parseLrc } from '../utils'
import { TPlayer } from '../types'

@Component
export default class AplayerLrc extends Vue {
  @Prop({ type: Object, required: true }) currentMusic!: TPlayer.Audio
  @Prop({ type: Object, required: true }) playStat!: TPlayer.PlayStat

  displayLrc = ''
  currentLineIndex = 0

  get lrcLines() {
    return parseLrc(this.displayLrc)
  }
  get currentLine() {
    if (this.currentLineIndex > this.lrcLines.length - 1) {
      return null
    }
    return this.lrcLines[this.currentLineIndex]
  }
  get transformStyle() {
    // transform: translateY(0); -webkit-transform: translateY(0);
    return {
      transform: `translateY(${-this.currentLineIndex * 16}px)`,
      webkitTransform: `translateY(${-this.currentLineIndex * 16}px)`,
    }
  }

  @Emit()
  applyLrc(lrc: string) {
    if (/^https?:\/\//.test(lrc)) {
      this.fetchLrc(lrc)
    } else {
      this.displayLrc = lrc
    }
  }

  @Emit()
  fetchLrc(src: string) {
    fetch(src)
      .then((response) => response.text())
      .then((lrc) => {
        this.displayLrc = lrc
      })
  }

  @Emit()
  hideLrc() {
    this.displayLrc = ''
  }

  @Watch('currentMusic', { immediate: true })
  onCurrentMusicChanged(music: TPlayer.Audio) {
    this.currentLineIndex = 0
    if (music.lrc) {
      this.applyLrc(music.lrc)
    } else {
      this.hideLrc()
    }
  }

  @Watch('playStat.playedTime', { immediate: true })
  onPlayedTimeChanged(playedTime: number) {
    for (let i = 0; i < this.lrcLines.length; i++) {
      const line = this.lrcLines[i]
      const nextLine = this.lrcLines[i + 1]
      if (playedTime >= line[0] && (!nextLine || playedTime < nextLine[0])) {
        this.currentLineIndex = i
      }
    }
  }
}
</script>
<style lang="scss">
@import '../scss/variables.scss';
.aplayer-lrc {
  position: relative;
  height: $lrc-height;
  text-align: center;
  overflow: hidden;
  margin-bottom: 7px;
  &:before {
    position: absolute;
    top: 0;
    z-index: 1;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 10%;
    content: ' ';
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0);
  }
  &:after {
    position: absolute;
    bottom: 0;
    z-index: 1;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 33%;
    content: ' ';
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ccffffff', GradientType=0);
  }
  p {
    font-size: 12px;
    color: #666;
    line-height: 16px;
    height: 16px;
    padding: 0;
    margin: 0;
    transition: all 0.5s ease-out;
    opacity: 0.4;
    overflow: hidden;
    &.aplayer-lrc-current {
      opacity: 1;
      overflow: visible;
      height: initial;
    }
  }
  .aplayer-lrc-contents {
    width: 100%;
    transition: all 0.5s ease-out;
    user-select: text;
    cursor: default;
  }
}
</style>
