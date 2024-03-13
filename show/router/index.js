import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/show/',
      name: 'home',
      component: () => import('../views/loadcomputer.vue'),
      children: [
        {
          path: 'poweron',
          name: 'poweron',
          component: () => import('../views/poweron.vue')
        }
      ]
    },
  ]
})

export default router
