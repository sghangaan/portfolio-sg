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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/myprofile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/projects',
      name: 'project',
      component: () => import('../views/ProjectView.vue')
    }
  ]
})

export default router