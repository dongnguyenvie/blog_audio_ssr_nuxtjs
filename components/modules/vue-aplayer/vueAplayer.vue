<template>
  <div
    class="aplayer"
    :class="{
      'aplayer-mini': mini,
      'aplayer-withlist': !mini && musicList.length > 0,
      'aplayer-withlrc': !mini && (!!$slots.display || showLrc),
      'aplayer-float': isFloatMode,
      'aplayer-loading': isPlaying && isLoading,
    }"
    :style="floatStyleObj"
  >
    <div class="aplayer-body">
      <thumbnail
        :pic="currentMusic.pic"
        :playing="isPlaying"
        :enable-drag="isFloatMode"
        :theme="currentTheme"
        @toggleplay="toggle"
        @dragbegin="onDragBegin"
        @dragging="onDragAround"
      />
      <div class="aplayer-info" v-show="!mini">
        <div class="aplayer-music">
          <span class="aplayer-title">{{ currentMusic.title || 'Untitled' }}</span>
          <span class="aplayer-author">{{ currentMusic.artist || 'Unknown' }}</span>
        </div>
        <slot name="display" :current-music="currentMusic" :play-stat="playStat">
          <lyrics :current-music="currentMusic" :play-stat="playStat" v-if="showLrc" />
        </slot>
        <controls
          :shuffle="shouldShuffle"
          :repeat="repeatMode"
          :stat="playStat"
          :volume="audioVolume"
          :muted="isAudioMuted"
          :theme="currentTheme"
          @toggleshuffle="shouldShuffle = !shouldShuffle"
          @togglelist="showList = !showList"
          @togglemute="toggleMute"
          @setvolume="setAudioVolume"
          @dragbegin="onProgressDragBegin"
          @dragend="onProgressDragEnd"
          @dragging="onProgressDragging"
          @nextmode="setNextMode"
        />
      </div>
    </div>
    <audio ref="audio"></audio>
    <music-list
      :show="showList && !mini"
      :current-music="currentMusic"
      :music-list="musicList"
      :play-index="playIndex"
      :listmaxheight="listMaxHeight"
      :theme="currentTheme"
      @selectsong="onSelectSong"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch, Ref } from 'nuxt-property-decorator'
import Thumbnail from './components/aplayer-thumbnail.vue'
import MusicList from './components/aplayer-list.vue'
import Controls from './components/aplayer-controller.vue'
import Lyrics from './components/aplayer-lrc.vue'
import { deprecatedProp, versionCompare, warn, randomRgba } from './utils'
import { TPlayer, REPEAT } from './types'

let versionBadgePrinted = false
const canUseSync = versionCompare(Vue.version, '2.3.0') >= 0

const picThemeCache: Record<string, string> = {}

// mutex playing instance
let activeMutex: APlayer | null = null

@Component({
  components: {
    Thumbnail,
    Controls,
    MusicList,
    Lyrics,
  },
})
export default class APlayer extends Vue {
  @Prop({ type: Object, required: true, validator: (song: TPlayer.Audio) => !!song.src }) music!: TPlayer.Audio
  @Prop({ type: Array, default: () => [] }) list!: TPlayer.Audio[]
  @Prop({ type: Boolean, default: false }) mini!: boolean
  @Prop({ type: Boolean, default: false }) showLrc!: boolean
  @Prop({ type: Boolean, default: true }) mutex!: boolean
  @Prop({ type: String, default: '#41b883' }) theme!: string
  @Prop({ type: String, default: REPEAT.NONE }) listMaxHeight!: string
  @Prop({ type: Boolean, default: false }) listFolded!: boolean
  @Prop({ type: Boolean, default: false }) float!: boolean
  @Prop({ type: Boolean, default: false }) autoplay!: boolean
  @Prop({ type: Boolean, default: false }) controls!: boolean
  @Prop({ type: Boolean, default: false }) muted!: boolean
  @Prop({ type: String, default: REPEAT.NONE }) preload!: TPlayer.Preload
  @Prop({ type: Number, default: 0.8, validator: (value: number) => value >= 0 && value <= 1 }) volume!: number
  @Prop({ type: Boolean, default: false }) shuffle!: boolean
  @Prop({ type: String, default: REPEAT.NO_REPEAT }) repeat!: string

  disableVersionBadge = false

  internalMusic = this.music
  isPlaying: boolean = false
  isSeeking: boolean = false

  wasPlayingBeforeSeeking: boolean = false
  rejectPlayPromise: null | ((reason?: any) => void) = null
  hls!: Hls

  isMobile: boolean = /mobile/i.test(window.navigator.userAgent)

  playStat = {
    duration: 0,
    loadedTime: 0,
    playedTime: 0,
  }
  showList = !this.listFolded

  audioPlayPromise = Promise.resolve()

  floatOriginX = 0
  floatOriginY = 0
  floatOffsetLeft = 0
  floatOffsetTop = 0

  selfAdaptingTheme: null | string = null

  internalMuted = this.muted
  internalVolume = this.volume

  isLoading = false
  internalShuffle = this.shuffle
  internalRepeat = this.repeat

  shuffledList: TPlayer.Audio[] = []

  @Ref('audio') readonly audio!: HTMLAudioElement

  get currentMusic() {
    return this.internalMusic
  }
  set currentMusic(val) {
    canUseSync && this.$emit('update:music', val)
    this.internalMusic = val
  }

  get currentTheme() {
    return this.selfAdaptingTheme || this.currentMusic.theme || this.theme
  }

  get isFloatMode() {
    return this.float && !this.isMobile
  }

  get shouldAutoplay() {
    if (this.isMobile) return false
    return this.autoplay
  }

  get musicList() {
    return this.list
  }

  get shouldShowNativeControls() {
    return process.env.NODE_ENV !== 'production' && this.controls && !this.mini
  }

  get floatStyleObj() {
    // transform: translate(floatOffsetLeft, floatOffsetY)
    return {
      transform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
      webkitTransform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
    }
  }

  get currentPicStyleObj() {
    if (this.currentMusic && this.currentMusic.pic) {
      return {
        backgroundImage: `url(${this.currentMusic.pic})`,
      }
    }
    return {}
  }

  get loadProgress() {
    if (this.playStat.duration === 0) return 0
    return this.playStat.loadedTime / this.playStat.duration
  }

  get playProgress() {
    if (this.playStat.duration === 0) return 0
    return this.playStat.playedTime / this.playStat.duration
  }

  get playIndex() {
    return this.shuffledList.indexOf(this.currentMusic)
  }
  set playIndex(val) {
    this.currentMusic = this.shuffledList[val % this.shuffledList.length]
  }

  get shouldRepeat() {
    return this.repeatMode !== REPEAT.NO_REPEAT
  }

  get isAudioMuted() {
    return this.internalMuted
  }
  set isAudioMuted(val) {
    canUseSync && this.$emit('update:muted', val)
    this.internalMuted = val
  }

  get audioVolume() {
    return this.internalVolume
  }
  set audioVolume(val) {
    canUseSync && this.$emit('update:volume', val)
    this.internalVolume = val
  }

  get shouldShuffle() {
    return this.internalShuffle
  }
  set shouldShuffle(val) {
    canUseSync && this.$emit('update:shuffle', val)
    this.internalShuffle = val
  }

  get repeatMode() {
    switch (this.internalRepeat) {
      case REPEAT.NONE:
      case REPEAT.NO_REPEAT:
        return REPEAT.NO_REPEAT
      case REPEAT.MUSIC:
      case REPEAT.REPEAT_ONE:
        return REPEAT.REPEAT_ONE
      default:
        return REPEAT.REPEAT_ALL
    }
  }
  set repeatMode(val) {
    canUseSync && this.$emit('update:repeat', val)
    this.internalRepeat = val
  }

  @Emit()
  onDragBegin() {
    this.floatOriginX = this.floatOffsetLeft
    this.floatOriginY = this.floatOffsetTop
  }

  @Emit()
  onDragAround({ offsetLeft, offsetTop }: { offsetLeft: number; offsetTop: number }) {
    this.floatOffsetLeft = this.floatOriginX + offsetLeft
    this.floatOffsetTop = this.floatOriginY + offsetTop
  }

  @Emit()
  setNextMode() {
    if (this.repeatMode === REPEAT.REPEAT_ALL) {
      this.repeatMode = REPEAT.REPEAT_ONE
    } else if (this.repeatMode === REPEAT.REPEAT_ONE) {
      this.repeatMode = REPEAT.NO_REPEAT
    } else {
      this.repeatMode = REPEAT.REPEAT_ALL
    }
  }

  @Emit()
  thenPlay() {
    this.$nextTick(() => {
      this.play()
    })
  }

  @Emit()
  toggle() {
    if (!this.audio.paused) {
      this.pause()
    } else {
      this.play()
    }
  }

  @Emit()
  play() {
    if (this.mutex) {
      if (activeMutex && activeMutex !== this) {
        activeMutex.pause()
      }
      activeMutex = this
    }
    // handle .play() Promise
    const audioPlayPromise = this.audio.play()
    if (audioPlayPromise) {
      return (this.audioPlayPromise = new Promise((resolve, reject) => {
        // rejectPlayPromise is to force reject audioPlayPromise if it's still pending when pause() is called
        this.rejectPlayPromise = reject
        audioPlayPromise
          .then((res) => {
            this.rejectPlayPromise = null
            resolve(res)
          })
          .catch(warn)
      }))
    }
  }

  @Emit()
  pause() {
    this.audioPlayPromise
      .then(() => {
        this.audio.pause()
      })
      // Avoid force rejection throws Uncaught
      .catch(() => {
        this.audio.pause()
      })
    // audioPlayPromise is still pending
    if (this.rejectPlayPromise) {
      // force reject playPromise
      this.rejectPlayPromise()
      this.rejectPlayPromise = null
    }
  }

  @Emit()
  onProgressDragBegin(val: number) {
    this.wasPlayingBeforeSeeking = this.isPlaying
    this.pause()
    this.isSeeking = true
    // handle load failures
    if (!isNaN(this.audio.duration)) {
      this.audio.currentTime = this.audio.duration * val
    }
  }

  @Emit()
  onProgressDragging(val: number) {
    if (isNaN(this.audio.duration)) {
      this.playStat.playedTime = 0
    } else {
      this.audio.currentTime = this.audio.duration * val
    }
  }

  @Emit()
  onProgressDragEnd(val: boolean) {
    this.isSeeking = false
    if (this.wasPlayingBeforeSeeking) {
      this.thenPlay()
    }
  }

  @Emit()
  toggleMute() {
    this.setAudioMuted(!this.audio.muted)
  }
  @Emit()
  setAudioMuted(val: boolean) {
    this.audio.muted = val
  }
  @Emit()
  setAudioVolume(val: number) {
    this.audio.volume = val
    if (val > 0) {
      this.setAudioMuted(false)
    }
  }

  @Emit()
  getShuffledList() {
    if (!this.list.length) {
      return [this.internalMusic]
    }
    let unshuffled = [...this.list]
    if (!this.internalShuffle || unshuffled.length <= 1) {
      return unshuffled
    }
    let indexOfCurrentMusic = unshuffled.indexOf(this.internalMusic)
    if (unshuffled.length === 2 && indexOfCurrentMusic !== -1) {
      if (indexOfCurrentMusic === 0) {
        return unshuffled
      } else {
        return [this.internalMusic, unshuffled[0]]
      }
    }
    // shuffle list
    // @see https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    for (let i = unshuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = unshuffled[i]
      unshuffled[i] = unshuffled[j]
      unshuffled[j] = tmp
    }
    // take currentMusic to first
    if (indexOfCurrentMusic !== -1) {
      indexOfCurrentMusic = unshuffled.indexOf(this.internalMusic)
      if (indexOfCurrentMusic !== 0) {
        ;[unshuffled[0], unshuffled[indexOfCurrentMusic]] = [unshuffled[indexOfCurrentMusic], unshuffled[0]]
      }
    }
    return unshuffled
  }

  @Emit()
  onSelectSong(song: TPlayer.Audio) {
    if (this.currentMusic === song) {
      this.toggle()
    } else {
      this.currentMusic = song
      this.thenPlay()
    }
  }
  // event handlers
  // for keeping up with audio states
  @Emit()
  onAudioPlay() {
    this.isPlaying = true
  }
  @Emit()
  onAudioPause() {
    this.isPlaying = false
  }
  @Emit()
  onAudioWaiting() {
    this.isLoading = true
  }
  @Emit()
  onAudioCanplay() {
    this.isLoading = false
  }
  @Emit()
  onAudioDurationChange() {
    if (this.audio.duration !== 1) {
      this.playStat.duration = this.audio.duration
    }
  }
  @Emit()
  onAudioProgress() {
    if (this.audio.buffered.length) {
      this.playStat.loadedTime = this.audio.buffered.end(this.audio.buffered.length - 1)
    } else {
      this.playStat.loadedTime = 0
    }
  }
  @Emit()
  onAudioTimeUpdate() {
    this.playStat.playedTime = this.audio.currentTime
  }
  @Emit()
  onAudioSeeking() {
    this.playStat.playedTime = this.audio.currentTime
  }
  @Emit()
  onAudioSeeked() {
    this.playStat.playedTime = this.audio.currentTime
  }
  @Emit()
  onAudioVolumeChange() {
    this.audioVolume = this.audio.volume
    this.isAudioMuted = this.audio.muted
  }
  @Emit()
  onAudioEnded() {
    // determine next song according to shuffle and repeat
    if (this.repeatMode === REPEAT.REPEAT_ALL) {
      if (this.shouldShuffle && this.playIndex === this.shuffledList.length - 1) {
        this.shuffledList = this.getShuffledList()
      }
      this.playIndex++
      this.thenPlay()
    } else if (this.repeatMode === REPEAT.REPEAT_ONE) {
      this.thenPlay()
    } else {
      this.playIndex++
      if (this.playIndex !== 0) {
        this.thenPlay()
      } else if (this.shuffledList.length === 1) {
        this.audio.currentTime = 0
      }
    }
  }

  @Emit()
  initAudio() {
    // since 1.4.0 Audio attributes as props
    this.audio.controls = this.shouldShowNativeControls
    this.audio.muted = this.muted
    this.audio.preload = this.preload
    this.audio.volume = this.volume
    // since 1.4.0 Emit as many native audio events
    // @see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
    const mediaEvents = [
      'abort',
      'canplay',
      'canplaythrough',
      'durationchange',
      'emptied',
      'encrypted',
      'ended',
      'error',
      'interruptbegin',
      'interruptend',
      'loadeddata',
      'loadedmetadata',
      'loadstart',
      'mozaudioavailable',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeupdate',
      'volumechange',
      'waiting',
    ]
    mediaEvents.forEach((event) => {
      this.audio.addEventListener(event, (e: any) => this.$emit(event, e))
    })
    // event handlers
    // they don't emit native media events
    this.audio.addEventListener('play', this.onAudioPlay)
    this.audio.addEventListener('pause', this.onAudioPause)
    this.audio.addEventListener('abort', this.onAudioPause)
    this.audio.addEventListener('waiting', this.onAudioWaiting)
    this.audio.addEventListener('canplay', this.onAudioCanplay)
    this.audio.addEventListener('progress', this.onAudioProgress)
    this.audio.addEventListener('durationchange', this.onAudioDurationChange)
    this.audio.addEventListener('seeking', this.onAudioSeeking)
    this.audio.addEventListener('seeked', this.onAudioSeeked)
    this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
    this.audio.addEventListener('volumechange', this.onAudioVolumeChange)
    this.audio.addEventListener('ended', this.onAudioEnded)
    if (this.currentMusic) {
      this.audio.src = this.currentMusic.src
    }
  }

  @Emit()
  setSelfAdaptingTheme() {
    // auto theme according to current music cover image
    if ((this.currentMusic.theme || this.theme) === 'pic') {
      const pic = this.currentMusic.pic
      // use cache
      if (picThemeCache[pic]) {
        this.selfAdaptingTheme = picThemeCache[pic]
      } else {
        try {
          this.selfAdaptingTheme = picThemeCache[pic] = randomRgba()
        } catch (e) {
          warn('color-thief is required to support self-adapting theme')
        }
      }
    } else {
      this.selfAdaptingTheme = null
    }
  }

  @Watch('music')
  onMusicChanged(music: TPlayer.Audio) {
    this.internalMusic = music
  }

  @Watch('currentMusic')
  onCurrentMusicChanged(music: any) {
    // async
    this.setSelfAdaptingTheme()
    const src = music.src
    // HLS support
    if (/\.m3u8(?=(#|\?|$))/.test(src)) {
      if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
        this.audio.src = src
      } else {
        try {
          const Hls = require('hls.js')
          if (Hls.isSupported()) {
            if (!this.hls) {
              this.hls = new Hls() as Hls
            }
            this.hls.loadSource(src)
            this.hls.attachMedia(this.audio)
          } else {
            warn('HLS is not supported on your browser')
            this.audio.src = src
          }
        } catch (e) {
          warn('hls.js is required to support m3u8')
          this.audio.src = src
        }
      }
    } else {
      this.audio.src = src
    }
    // self-adapting theme color
  }

  @Watch('shouldShowNativeControls')
  onShouldShowNativeControlsChanged(val: boolean) {
    this.audio.controls = val
  }

  @Watch('isAudioMuted')
  onIsAudioMutedChanged(val: boolean) {
    this.audio.muted = val
  }

  @Watch('preload')
  onPreloadChanged(val: string) {
    this.audio.preload = val
  }

  @Watch('audioVolume')
  onAudioVolumeChanged(val: number) {
    this.audio.volume = val
  }

  @Watch('muted')
  onMutedChanged(val: boolean) {
    this.internalMuted = val
  }

  @Watch('volume')
  onVolumeChanged(val: number) {
    this.internalVolume = val
  }

  @Watch('shuffle')
  onShuffleChanged(val: boolean) {
    this.internalShuffle = val
  }

  @Watch('repeat')
  onRepeatChanged(val: string) {
    this.internalRepeat = val
  }

  beforeCreate() {
    if (!(APlayer as any).disableVersionBadge && !versionBadgePrinted) {
      // version badge
      console.log(`\n\n %c AUDIOVYVY %c audiovyvy.com \n`, 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #35495e; padding:5px 0;')
      versionBadgePrinted = true
    }
  }
  created() {
    this.shuffledList = this.getShuffledList()
  }
  mounted() {
    this.initAudio()
    this.setSelfAdaptingTheme()
    if (this.autoplay) this.play()
  }
  beforeDestroy() {
    if (activeMutex === this) {
      activeMutex = null
    }
    if (this.hls) {
      this.hls.destroy()
    }
  }
}
</script>

<style lang="scss">
@import '~/components/modules/vue-aplayer/scss/variables.scss';

.aplayer {
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  background-color: #fff;
  margin: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  user-select: none;
  line-height: initial;

  * {
    box-sizing: content-box;
  }

  .aplayer-lrc-content {
    display: none;
  }

  .aplayer-body {
    display: flex;

    position: relative;
    .aplayer-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      text-align: start;
      padding: 14px 7px 0 10px;
      height: $aplayer-height;
      box-sizing: border-box;
      overflow: hidden;

      .aplayer-music {
        flex-grow: 1;

        overflow: hidden;
        /* white-space: nowrap; */
        text-overflow: ellipsis;
        margin-left: 5px;
        user-select: text;
        cursor: default;
        padding-bottom: 2px;

        .aplayer-title {
          font-size: 14px;
        }

        .aplayer-author {
          font-size: 12px;
          color: #666;
        }
      }

      .aplayer-lrc {
        z-index: 0;
      }
    }
  }

  audio[controls] {
    display: block;
    width: 100%;
  }

  // Mini mode
  &.aplayer-mini {
    width: $aplayer-height;
  }

  &.aplayer-withlrc {
    .aplayer-body {
      .aplayer-pic {
        height: $aplayer-height-lrc;
        width: $aplayer-height-lrc;
      }

      .aplayer-info {
        height: $aplayer-height-lrc;
      }

      .aplayer-info {
        padding: 10px 7px 0 7px;
      }
    }
  }

  &.aplayer-withlist {
    .aplayer-body {
      .aplayer-info {
        border-bottom: 1px solid #e9e9e9;
      }

      .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-menu {
        display: block;
      }
    }
  }

  /* floating player on top */
  position: relative;
  &.aplayer-float {
    z-index: 1;
  }
}

@keyframes aplayer-roll {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
</style>
