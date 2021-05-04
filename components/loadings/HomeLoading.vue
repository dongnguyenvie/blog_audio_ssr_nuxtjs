<template>
  <div class="flex flex-wrap px-8">
    <h1>Loading</h1>
    <!-- <HashtagSessionVue class="w-full pb-1 mb-3 border-t-2 pt-5 border-gray-200" :data="hashtagData" /> -->
    <TrendingSessionVue class="pt-6 pb-6" />
    <!-- <ArticlesSessionVue class="pb-6 pt-6 border-t-2 border-gray-200" :title="recommendData.title" :data="recommendData.data" /> -->
    <section class="flex flex-wrap w-full pb-6 pt-6 border-t-2 border-gray-200">
      <h3 class="w-full block text-2xl pb-5 mx-2 font-medium">Articles</h3>
      <SkeletonArticleBoxVue v-for="index in 40" :key="index" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HashtagSessionVue from '~/components/skeletons/HashtagSkeletonSession.vue'
import SkeletonArticleBoxVue from '~/components/skeletons/ArticleSkeletonBox.vue'
import TrendingSessionVue from '~/components/skeletons/TrendingSkeletonSession.vue'
import ArticlesSessionVue from '~/components/skeletons/ArticlesSkeletonSession.vue'

export default Vue.extend({
  data: () => ({
    loading: false,
  }),
  computed: {},
  methods: {
    start() {
      this.loading = true
    },
    finish() {},
  },
  components: {
    SkeletonArticleBoxVue,
    TrendingSessionVue,
  },
  mounted() {},
})
</script>

<style></style>
