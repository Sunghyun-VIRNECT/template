<template>
  <!-- Remove & use example component! -->
  <Nav />
  <RouterView />
</template>

<script>
import { inject } from 'vue'
import Nav from '~/components/Nav'

export default {
  components: {
    Nav,
  },
  setup() {
    const $store = inject('$store')

    return {
      $store,
    }
  },
}
</script>
