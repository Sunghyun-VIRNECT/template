<template>
  <Default />
  <!-- Remove & use example component! -->
  <Nav />
  <RouterView />
</template>

<script>
import Default from './layouts/Default'
import { inject } from 'vue'
import Nav from '~/components/Nav'

export default {
  name: 'App',
  components: {
    Default,
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
