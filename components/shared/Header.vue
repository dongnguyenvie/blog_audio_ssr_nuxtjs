<template>
  <nav class="fixed w-screen z-20 bg-white">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex flex-no-wrap md:w-3/12 lg:w-3/12 xl:w-2/12 overflow-hidden">
          <div class="flex justify-start items-center ali w-auto cursor-pointer" @click="handleToggleMenu">
            <font-awesome-icon class="text-2xl fill-current text-gray-600" :icon="['fas', 'bars']"></font-awesome-icon>
          </div>
          <div class="ml-4">
            <nuxt-link :to="{ name: $routeNames.homePage }" tag="a">
              <img :src="logoUrl" class="w-full" />
            </nuxt-link>
          </div>
        </div>
        <div class="px-0 hidden flex-grow pl-2 md:block lg:pl-4">
          <input
            placeholder="Tìm kiếm"
            class="w-full transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
          />
        </div>
        <div class="lg:flex lg:items-center lg:justify-between sm:w-2/4 md:w-2/5 xl:w-1/4">
          <ul class="flex flex-row justify-end list-none lg:ml-auto">
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fas', 'phone-volume']" style="font-size: 20px;"></font-awesome-icon>
              </a>
            </li>
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fab', 'facebook-f']" style="font-size: 20px;"></font-awesome-icon>
              </a>
            </li>
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fas', 'bell']" style="font-size: 20px;"></font-awesome-icon>
              </a>
            </li>
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fas', 'question-circle']" style="font-size: 20px;"></font-awesome-icon>
                <span class="hidden lg:inline-block ml-2">Supports </span>
                <span class="ml-1 leading-8">
                  <font-awesome-icon :icon="['fas', 'sort-down']" style="font-size: 20px;"></font-awesome-icon>
                </span>
              </a>
            </li>
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fas', 'question-circle']" style="font-size: 20px;"></font-awesome-icon>
                <span class="hidden lg:inline-block ml-2">Menu </span>
                <span class="ml-1 leading-8">
                  <font-awesome-icon :icon="['fas', 'sort-down']" style="font-size: 20px;"></font-awesome-icon>
                </span>
              </a>
            </li>
            <li class="flex items-center">
              <a class="lg:text-gray-700 lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" href="#pablo">
                <font-awesome-icon :icon="['fas', 'user-circle']" style="font-size: 22px;"></font-awesome-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { ROOT_MODULE, UI_MODULE } from '~/types/store'

@Component
export default class Header extends Vue {
  logoUrl = 'https://i.ya-webdesign.com/images/air-waves-png-7.png'

  // @Getter(ROOT_MODULE.getNavBar) navbar!: number
  @Mutation(UI_MODULE.mutationSetStatusNavBar, { namespace: UI_MODULE.namespace }) onSetToggleMenu!: (payload: { toggle: boolean }) => void

  @Emit()
  handleGoHome() {
    this.$router.push({ name: this.$routeNames.homePage })
  }

  @Emit()
  handleToggleMenu() {
    this.onSetToggleMenu({ toggle: true })
  }
}
</script>
<style></style>
