import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _accb3ad2 = () => interopDefault(import('../pages/account.vue' /* webpackChunkName: "pages/account" */))
const _5e8e935a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1fba57b1 = () => interopDefault(import('../pages/logo.vue' /* webpackChunkName: "pages/logo" */))
const _41ef5b71 = () => interopDefault(import('../pages/message.vue' /* webpackChunkName: "pages/message" */))
const _350b44ae = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _81d09c4a = () => interopDefault(import('../pages/trips/index.vue' /* webpackChunkName: "pages/trips/index" */))
const _0292d290 = () => interopDefault(import('../pages/wishlists.vue' /* webpackChunkName: "pages/wishlists" */))
const _1a982e45 = () => interopDefault(import('../pages/book/stays/_id.vue' /* webpackChunkName: "pages/book/stays/_id" */))
const _45734f0d = () => interopDefault(import('../pages/rooms/_id.vue' /* webpackChunkName: "pages/rooms/_id" */))
const _0711133c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _accb3ad2,
    name: "account"
  }, {
    path: "/login",
    component: _5e8e935a,
    name: "login"
  }, {
    path: "/logo",
    component: _1fba57b1,
    name: "logo"
  }, {
    path: "/message",
    component: _41ef5b71,
    name: "message"
  }, {
    path: "/register",
    component: _350b44ae,
    name: "register"
  }, {
    path: "/trips",
    component: _81d09c4a,
    name: "trips"
  }, {
    path: "/wishlists",
    component: _0292d290,
    name: "wishlists"
  }, {
    path: "/book/stays/:id?",
    component: _1a982e45,
    name: "book-stays-id"
  }, {
    path: "/rooms/:id?",
    component: _45734f0d,
    name: "rooms-id"
  }, {
    path: "/",
    component: _0711133c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
