<template>
  <h2 @click="changeMessage">
    {{ msg }}
    {{ $t('error.404') }}
    {{ $i18n.locale }}
  </h2>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(_, ctx) {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const msg = computed(() => {
      return store.state.message.msg
    })
    console.log(proxy.$store)
    console.log(ctx)
    const changeMessage = () => {
      store.dispatch('message/changeMessage', 'Hello Vue!!!')
    }
    return {
      msg,
      changeMessage,
    }
  },
}
</script>

<style scoped lang="scss">
h2 {
  font-size: 22px;
  & + img {
    width: 120px;
  }
}
</style>
