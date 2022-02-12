import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../views/Employee'
import PatientList from '../views/PatientList'
import Emc from '../views/Emc'
import Profile from '../components/Profile'
// import Login from '../components/Login'
import Schedule from '../components/Schedule'
import Enter from '../views/Enter'
import AppointmentForm from '../components/AppointmentForm'
import Report from '../views/Report'

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
    component: Enter
  },
  {
    path: '/schedule/:id',
    component: Schedule
  },
  {
    path: '/appointment/:id',
    component: AppointmentForm
  },
  {
    path: '/report/:id',
    component: Report
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
