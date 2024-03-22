import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/boot',
      name: 'boot',
      component: () => import('../views/BootView.vue')
    },
    {
      path: '/segment',
      name: 'segment',
      component: () => import('../views/SegmentView.vue')
    },
    {
      path: '/io',
      name: 'io',
      component: () => import('../views/IOView.vue')
    },
    {
      path: '/compiler',
      name: 'compiler',
      component: () => import('../views/CompilerView.vue')
    },
    {
      path: '/risc-v-binary',
      name: 'risc-v-binary',
      component: () => import('../views/risc-v-View.vue')
    },
    {
      path: '/binary',
      name: 'binary',
      component: () => import('../views/binaryView.vue')
    }
  ]
})

export default router
