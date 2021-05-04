<template>
  <main class="flex flex-wrap">
    <Header />
    <div class="w-screen flex mt-16">
      <div
        :class="[
          'w-64 flex-none hidden lg:flex relative',
          {
            'navbar-show': isNavbar,
          },
        ]"
      >
        <div class="w-64 flex flex-col fixed top-0 left-0 pt-16 h-screen overflow-y-auto scrollbar-y-bar z-10 bg-white">
          <NavBar />
        </div>
      </div>
      <div
        :class="[
          'w-24 flex-none hidden md:block lg:hidden relative',
          {
            'navbar-hidden': isNavbar,
          },
        ]"
      >
        <div class="w-24 flex flex-col fixed top-0 left-0 pt-16 h-screen overflow-y-auto scrollbar-y-bar">
          <SmallNavBar />
        </div>
      </div>
      <div class="flex-grow">
        <nuxt />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

import Header from '~/components/shared/Header.vue'
import NavBar from '~/components/shared/NavBar.vue'
import SmallNavBar from '~/components/shared/SmallNavBar.vue'
import { ROOT_MODULE, UI_MODULE } from '~/types/store'
import { Debounce } from '~/utils/decorator'
import { BREAKPOINTS_NM } from '~/utils/contants'

@Component({
  components: {
    Header,
    NavBar,
    SmallNavBar,
  },
})
export default class DefaultLayout extends Vue {
  @Getter(UI_MODULE.getStatusNavBar, { namespace: UI_MODULE.namespace }) isNavbar!: boolean
  @Getter(UI_MODULE.getWidthScreen, { namespace: UI_MODULE.namespace }) widthScreen!: number
  @Getter(UI_MODULE.getBreakpointNm, { namespace: UI_MODULE.namespace }) breakpointNm!: number

  @Mutation(UI_MODULE.mutationSetWidthScreen, { namespace: UI_MODULE.namespace }) onSetWidthScreen!: (width: number) => void
  @Mutation(UI_MODULE.mutationSetStatusNavBar, { namespace: UI_MODULE.namespace }) onSetStatusNavBar!: (payload: { flg: boolean }) => void

  @Emit()
  @Debounce(300)
  handleResizeWindow(e: Event) {
    const wS = window.innerWidth
    this.onSetWidthScreen(wS)
    this.onSetStatusNavBar({ flg: false })
    // if (wS > BREAKPOINTS_NM.extraLarge.value) {
    // } else if (wS > BREAKPOINTS_NM.large.value) {
    // } else if (wS > BREAKPOINTS_NM.medium.value) {
    // } else if (wS > BREAKPOINTS_NM.small.value) {
    // } else {
    // }
  }

  created() {}
  mounted() {
    window.addEventListener('resize', this.handleResizeWindow)
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResizeWindow)
  }
}
</script>
<style></style>
