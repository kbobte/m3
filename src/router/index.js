import Vue from 'vue'
import VueRouter from 'vue-router'
import Example from '@/components/Example'
import Swap from '@/components/Swap'

Vue.use(VueRouter)

const routes = [
  {
    path: '/example',
    name: 'Example',
    component: Example
  },
  {
    path: '/swap',
    name: 'Swap',
    component: Swap
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
