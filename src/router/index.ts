import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginCenterRouter from './login/login'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/layouts/Default.vue'),
    redirect: {
      name: 'login',
    },
    children: [LoginCenterRouter],
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
