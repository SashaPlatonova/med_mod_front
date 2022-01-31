import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../views/Employee'
import PatientList from '../views/PatientList'
import Emc from '../views/Emc'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Schedule from '../components/Schedule'

const routes = [
  {
    path: '/employee/:id',
    component: Employee
  },
  {
    path: '/patientList/:id',
    component: PatientList
  },
  {
    path: '/emc/:id',
    component: Emc
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/schedule/:id',
    component: Schedule
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
