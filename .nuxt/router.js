import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4108970a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0dca778d = () => interopDefault(import('../pages/rooms/index.vue' /* webpackChunkName: "pages/rooms/index" */))
const _76136f38 = () => interopDefault(import('../pages/rooms/_room/index.vue' /* webpackChunkName: "pages/rooms/_room/index" */))
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
    path: "/login",
    component: _4108970a,
    name: "login"
  }, {
    path: "/rooms",
    component: _0dca778d,
    name: "rooms"
  }, {
    path: "/rooms/:room",
    component: _76136f38,
    name: "rooms-room"
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
