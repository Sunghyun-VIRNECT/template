<template>
  <!-- <VirnectHeader
    :env="{}"
    :userInfo="{}"
    :urls="{}"
    :logo="{}"
    :showStatus="showStatus"
    :subTitle="sfsdf"
    @isMobile="isMobile"
  /> -->
  {{ mobile }}
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const mobile = computed(() => {
      return store.state.mobile.isMobile
    })
    const showStatus = {
      login: false,
      profile: false,
      language: true,
      portal: false,
    }

    const isMobile = str => {
      store.dispatch('mobile/IS_MOBILE', str)
    }
    return {
      showStatus,
      mobile,
      isMobile,
    }
  },
}
</script>
