import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Releases from '../views/Releases.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Releases
  },
  {
    path: '/peers',
    name: 'Peers',
    component: () => import(/* webpackChunkName: "Peers" */ '../views/Peers.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router