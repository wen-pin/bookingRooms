import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _139676bf = () => interopDefault(import('../pages/account.vue' /* webpackChunkName: "pages/account" */))
const _4108970a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7b0af489 = () => interopDefault(import('../pages/logo.vue' /* webpackChunkName: "pages/logo" */))
const _a82920ce = () => interopDefault(import('../pages/message.vue' /* webpackChunkName: "pages/message" */))
const _89fe62fe = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _31c51bfa = () => interopDefault(import('../pages/trips/index.vue' /* webpackChunkName: "pages/trips/index" */))
const _4c037e40 = () => interopDefault(import('../pages/wishlists.vue' /* webpackChunkName: "pages/wishlists" */))
const _e066c5c6 = () => interopDefault(import('../pages/book/stays/_id.vue' /* webpackChunkName: "pages/book/stays/_id" */))
const _20baf935 = () => interopDefault(import('../pages/rooms/_id.vue' /* webpackChunkName: "pages/rooms/_id" */))
const _15d41164 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _139676bf,
    name: "account"
  }, {
    path: "/login",
    component: _4108970a,
    name: "login"
  }, {
    path: "/logo",
    component: _7b0af489,
    name: "logo"
  }, {
    path: "/message",
    component: _a82920ce,
    name: "message"
  }, {
    path: "/register",
    component: _89fe62fe,
    name: "register"
  }, {
    path: "/trips",
    component: _31c51bfa,
    name: "trips"
  }, {
    path: "/wishlists",
    component: _4c037e40,
    name: "wishlists"
  }, {
    path: "/book/stays/:id?",
    component: _e066c5c6,
    name: "book-stays-id"
  }, {
    path: "/rooms/:id?",
    component: _20baf935,
    name: "rooms-id"
  }, {
    path: "/",
    component: _15d41164,
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
