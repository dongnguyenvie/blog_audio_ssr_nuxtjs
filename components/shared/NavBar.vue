<template>
  <nav class="absolute w-full">
    <div class="w-full py-6">
      <div v-for="(group, index) in navbar" :key="index">
        <div v-for="(item, i) in group.children" :key="`${index}-${i}`" class="pl-3 px-2 hover:bg-gray-200">
          <div>
            <a
              href="#"
              @click.prevent="handleRedirectMenu(item)"
              :class="[
                'flex items-center hover:text-gray-900 font-medium text-gray-900 py-2',
                {
                  'line-through': !item.isEnable,
                },
              ]"
            >
              <font-awesome-icon :icon="['fas', item.icon]" class="text-gray-600 text-xl"></font-awesome-icon>
              <span class="ml-3">{{ item.label }}</span>
            </a>
          </div>
        </div>
        <div class="w-full border-gray-200 pb-1 border-b-2" />
      </div>
      <div v-for="category in categories" :key="category.id" class="pl-3 px-2 hover:bg-gray-200">
        <div>
          <nuxt-link
            :to="{ name: $routeNames.categoryDetailPage, params: { slug: category.slug, page: 1 } }"
            tag="a"
            class="flex items-center hover:text-gray-900 font-medium text-gray-900 py-2"
          >
            <font-awesome-icon :icon="['fas', 'caret-square-right']" class="text-gray-600 text-xl"></font-awesome-icon>
            <span class="ml-3">{{ category.title }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Action, Getter, Mutation } from 'nuxt-property-decorator'
import { NAVBAR, FORMAT_SLUG } from '~/utils/contants'
import { Category } from '~/types/category'
import { ROOT_MODULE } from '~/types/store'

@Component
export default class NavBar extends Vue {
  navbar = NAVBAR

  @Getter(ROOT_MODULE.getCategories) categories!: Category[]

  @Emit()
  handleRedirectCategory(category: Category) {
    this.$router.push({ name: this.$routeNames.categoryDetailPage, params: { slug: category.slug, page: '1' } })
  }

  @Emit()
  handleRedirectMenu(item: typeof NAVBAR[0]['children'][0]) {
    if (item.name) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>
<style></style>
