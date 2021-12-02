import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../views/Employee'
import PatientList from '../views/PatientList'
import Emc from '../views/Emc'

const routes = [
  {
    path: '/employee',
    component: Employee
  },
  {
    path: '/patientList/:id',
    component: PatientList
  },
  {
    path: '/emc/:id',
    component: Emc
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
