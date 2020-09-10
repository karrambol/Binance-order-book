import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OrderBook',
    component: () =>
      import(/* webpackChunkName: "order-book" */ '../views/OrderBook.vue')
  },
  {
    path: '/diff',
    name: 'Diff',
    component: () => import(/* webpackChunkName: "diff" */ '../views/Diff.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
