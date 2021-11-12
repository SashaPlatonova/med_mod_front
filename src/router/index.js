import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../views/Employee'

const routes = [
  {
    path: '/employee',
    component: Employee
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
