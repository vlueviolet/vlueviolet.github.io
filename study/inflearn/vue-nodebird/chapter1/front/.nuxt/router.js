import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _24afc22d = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _1c2457c4 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _3d0c4fd6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _24afc22d,
    name: "profile"
  }, {
    path: "/signup",
    component: _1c2457c4,
    name: "signup"
  }, {
    path: "/",
    component: _3d0c4fd6,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
