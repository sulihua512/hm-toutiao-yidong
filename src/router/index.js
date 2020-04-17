import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', name: 'Home', component: () => import('../views/home/index.vue') },
      { path: '/question', name: 'Question', component: () => import('../views/question/index.vue') },
      { path: '/video', name: 'Video', component: () => import('../views/video/index.vue') },
      { path: '/user', name: 'User', component: () => import('../views/user/index.vue') }
    ]
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/search/result',
    name: 'searchResult',
    component: () => import('../views/search/result.vue')
  },
  {
    path: '/aritcle/:id',
    name: 'articleDetail',
    component: () => import('../views/article/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
