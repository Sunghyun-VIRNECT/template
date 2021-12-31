<template>
  <nav>
    <RouterLink to="/"> Home </RouterLink>
    <RouterLink to="/about"> About </RouterLink>
    <RouterLink to="/about"> {{ t('test.asdf') }} </RouterLink>
    {{ locale }}
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ko">ko</option>
    </select>
    <RouterLink to="/about"> {{ t('error.404') }} </RouterLink>
  </nav>
</template>

<script>
import { useI18n } from 'vue-i18n'
export default {
  setup() {
    const { t, locale } = useI18n()
    return {
      t,
      locale,
    }
  },
}
</script>
