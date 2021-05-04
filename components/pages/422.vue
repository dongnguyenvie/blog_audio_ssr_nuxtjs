<template>
  <div>
    <!-- This file lives in public/404.html -->
    <div class="container mx-auto px-4">
      <section class="py-8 px-4 text-center">
        <div class="max-w-auto mx-auto">
          <div class="md:max-w-lg mx-auto">
            <!-- llustration by Ouch.pics https://icons8.com/ouch/illustration/flamenco-no-comments -->
            <img class="w-64 mx-auto" src="flamenco-no-comments.png" />
          </div>
          <h2 class="mt-8 uppercase text-xl lg:text-5xl font-black">The change you wanted was rejected.</h2>
          <p class="mt-6 uppercase text-sm lg:text-base text-gray-900">
            Maybe you tried to change something you didn't have access to. <br />
            If you are the application owner check the logs for more information.
          </p>
          <nuxt-link
            :to="{ name: $routeNames.homePage }"
            tag="a"
            class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded-full inline-block uppercase shadow-md"
          >
            Quay về trang chủ
          </nuxt-link>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'

@Component
export default class Page422 extends Vue {
  @Emit()
  handleGoHome() {
    this.$router.push({ name: this.$routeNames.homePage })
  }
}
</script>
