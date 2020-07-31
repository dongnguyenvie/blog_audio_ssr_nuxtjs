<template>
  <main class="flex flex-wrap">
    <HeaderVue />
    <div class="w-screen flex mt-16">
      <div class="w-64 flex-none hidden lg:flex relative">
        <div class="w-64 flex flex-col fixed top-0 left-0 pt-16 h-screen overflow-y-auto scrollbar-y-bar">
          <NavBarVue />
        </div>
      </div>
      <div class="w-20 flex-none hidden md:block lg:hidden bg-red-500">
        <!-- <NavBarVue /> -->
      </div>
      <div class="flex-grow">
        <nuxt />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import HeaderVue from '~/components/Header.vue'
import NavBarVue from '~/components/NavBar.vue'

@Component({
  components: {
    HeaderVue,
    NavBarVue,
  },
})
export default class DefaultLayout extends Vue {}
</script>
<style></style>
