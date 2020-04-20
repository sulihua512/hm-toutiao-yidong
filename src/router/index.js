import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import store from '@/store/index.js'

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
    path: '/article/:id',
    name: 'articleDetail',
    component: () => import('../views/article/index.vue')
  },
  {
    path: '/user/profile',
    name: 'useProfile',
    component: () => import('../views/user/profile.vue')
  },
  {
    path: '/user/chat',
    name: 'chat',
    component: () => import('../views/user/chat.vue')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach(function (to, from, next) {
  if (isOk(to)) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        from: to.fullPath
      }
    })
  }
})

function isOk (to) {
  if (to.path.startsWith('/user') && !store.state.user) {
    // console.log(to)
    return false
  } else {
    return true
  }
}
export default router
