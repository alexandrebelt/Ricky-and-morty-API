import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/CharacterList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: List
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
