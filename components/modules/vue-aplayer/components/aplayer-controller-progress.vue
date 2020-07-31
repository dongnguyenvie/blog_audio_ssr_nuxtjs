<template>
  <div class="aplayer-bar-wrap" @mousedown="onThumbMouseDown" @touchstart="onThumbTouchStart" ref="barWrap">
    <div class="aplayer-bar">
      <div class="aplayer-loaded" :style="{ width: `${loadProgress * 100}%` }"></div>
      <div class="aplayer-played" :style="{ width: `${playProgress * 100}%`, background: theme }">
        <span
          ref="thumb"
          @mouseover="thumbHovered = true"
          @mouseout="thumbHovered = false"
          class="aplayer-thumb"
          :style="{ borderColor: theme, backgroundColor: thumbHovered ? theme : '#fff' }"
        >
          <span class="aplayer-loading-icon" :style="{ backgroundColor: theme }">
            <icon type="loading" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch, Ref } from 'nuxt-property-decorator'
import { getElementViewLeft } from '../utils'
import Icon from './aplayer-icon.vue'

@Component({
  components: {
    Icon,
  },
})
export default class AplayerControllerProgress extends Vue {
  @Prop({ type: Number }) loadProgress!: number
  @Prop({ type: Number }) playProgress!: number
  @Prop({ type: String }) theme!: string

  thumbHovered = false

  @Ref('barWrap') barWrap!: HTMLDivElement

  @Emit()
  onThumbMouseDown(e: MouseEvent) {
    const barWidth = this.barWrap.clientWidth
    let percentage = (e.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragbegin', percentage)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
    document.addEventListener('mouseup', this.onDocumentMouseUp)
  }

  @Emit()
  onDocumentMouseMove(e: MouseEvent) {
    const barWidth = this.barWrap.clientWidth
    let percentage = (e.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragging', percentage)
  }

  @Emit()
  onDocumentMouseUp(e: MouseEvent) {
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    document.removeEventListener('mousemove', this.onDocumentMouseMove)
    const barWidth = this.barWrap.clientWidth
    let percentage = (e.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragend', percentage)
  }

  @Emit()
  onThumbTouchStart(e: MouseEvent) {
    const barWidth = this.barWrap.clientWidth
    let percentage = (e.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragbegin', percentage)
    document.addEventListener('touchmove', this.onDocumentTouchMove as any)
    document.addEventListener('touchend', this.onDocumentTouchEnd as any)
  }

  @Emit()
  onDocumentTouchMove(e: TouchEvent) {
    const touch = e.changedTouches[0]
    const barWidth = this.barWrap.clientWidth
    let percentage = (touch.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragging', percentage)
  }

  @Emit()
  onDocumentTouchEnd(e: TouchEvent) {
    document.removeEventListener('touchend', this.onDocumentTouchEnd)
    document.removeEventListener('touchmove', this.onDocumentTouchMove)
    const touch = e.changedTouches[0]
    const barWidth = this.barWrap.clientWidth
    let percentage = (touch.clientX - getElementViewLeft(this.barWrap)) / barWidth
    percentage = percentage > 0 ? percentage : 0
    percentage = percentage < 1 ? percentage : 1
    this.$emit('dragend', percentage)
  }
}
</script>
<style lang="scss">
.aplayer-bar-wrap {
  margin: 0 0 0 5px;
  padding: 4px 0;
  cursor: pointer;
  flex: 1;
  .aplayer-bar {
    position: relative;
    height: 2px;
    width: 100%;
    background: #cdcdcd;
    .aplayer-loaded {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: #aaa;
      height: 2px;
      transition: all 0.5s ease;
      will-change: width;
    }
    .aplayer-played {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 2px;
      transition: background-color 0.3s;
      will-change: width;
      .aplayer-thumb {
        position: absolute;
        top: 0;
        right: 5px;
        margin-top: -7px;
        margin-right: -10px;
        width: 15px;
        height: 15px;
        border: 1px solid;
        transform: scale(0.8);
        will-change: transform;
        transition: transform 300ms, background-color 0.3s, border-color 0.3s;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        &:hover {
          transform: scale(1);
        }
        overflow: hidden;
        .aplayer-loading-icon {
          display: none;
          width: 100%;
          height: 100%;
          svg, img {
            position: absolute;
            animation: spin 1s linear infinite;
            fill: #ffffff;
          }
        }
      }
    }
  }
}
.aplayer-loading {
  .aplayer-bar-wrap .aplayer-bar .aplayer-thumb .aplayer-loading-icon {
    display: block;
  }
  .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb {
    transform: scale(1);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
