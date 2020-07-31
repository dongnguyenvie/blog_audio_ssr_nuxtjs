<template>
  <button type="button" class="aplayer-icon">
    <icon :type="icon" />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation, Watch } from 'nuxt-property-decorator'
import Icon from './aplayer-icon.vue'

@Component({
  components: {
    Icon,
  },
})
export default class AplayerIconButton extends Vue {
  @Prop({ type: String }) icon!: string
}
</script>

<style lang="scss">
.aplayer-icon {
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  opacity: 0.8;
  vertical-align: middle;
  padding: 0;
  font-size: 12px;
  margin: 0;
  display: inline;
  &:hover {
    opacity: 1;
  }
  .aplayer-fill {
    transition: all 0.2s ease-in-out;
  }
}
</style>
