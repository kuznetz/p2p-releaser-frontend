import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ReleaseList from '../views/ReleaseList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: ReleaseList
  },
  {
    path: '/release/:id',
    name: 'Release',
    component: () => import(/* webpackChunkName: "Release" */ '../views/Release.vue'),
    props: true
  },  
  {
    path: '/peers',
    name: 'Peers',
    component: () => import(/* webpackChunkName: "Peers" */ '../views/Peers.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router