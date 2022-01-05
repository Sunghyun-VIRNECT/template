<template>
  <section class="home-section">
    <h2>우쨜래미</h2>
    <p>{{ $t('test.welcome') }}</p>
    <p>{{ $i18n.locale }}</p>
    <img src="@/assets/images/apple.jpg" />
  </section>
</template>

<script>
// import { ref, onMounted } from '@vue/composition-api'
// import essential from 'service/slice/essential'
export default {
  // props: {
  //   showStatus: Object,
  //   auth: Object,
  // },
  setup(props, { root }) {
    console.log(root)
    // const ESSENTIAL = essential(root)
    // const show = ref(false)
    // const message = ref({})

    // const loginService = () => {
    //   show.value = true
    //   setTimeout(() => {
    //     show.value = false
    //   }, 1500)
    // }
    // onMounted(() => {
    //   // 서버 푸시 메세지
    //   if (root.$route && root.$route.query !== undefined) {
    //     const messageKey = root.$route.query.message
    //     if (messageKey) {
    //       message.value = {
    //         title: root.$t(`messages.${messageKey}.title`),
    //         contents: root.$t(`messages.${messageKey}.contents`),
    //       }
    //       show.value = true
    //     }

    //     const redirectTarget = root.$route.query.continue
    //     // 자신으로 리다이렉트 제외
    //     if (redirectTarget === undefined) return
    //     // 로그인 필요 다이얼로그
    //     if (redirectTarget.split(root.$urls.www).length == 1) {
    //       message.value.title = root.$t('login.needTo.title')
    //       message.value.contents = root.$t('login.needTo.contents')
    //       loginService()
    //     }
    //   }
    // })

    return {
      // ...ESSENTIAL,
      // show,
      // message,
      // loginService,
    }
  },
}
</script>
