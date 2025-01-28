import TextPoster from '@/pages/TextPoster.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: TextPoster },
  { path: '/home', component: () => import('@/pages/Home.vue') },
  { path: '/canvas-layout', component: () => import('@/pages/CanvasLayout.vue') },
  { path: '/playground', component: () => import('@/pages/Playground.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
