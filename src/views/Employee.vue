<template>
  <employee-card :employee="employees[0]" @update-empl="updateEmployee"/>
</template>

<script>
import EmployeeCard from '../components/EmployeeCard'
import axios from 'axios'
import authHeader from '../services/auth-header'
export default {
  name: 'Employee',
  components: {
    EmployeeCard
  },
  data () {
    return {
      employees: [],
      header: ''
    }
  },
  methods: {
    async fetchEmployee () {
      try {
        const response = await axios.get('http://localhost:8080/api/employee/find/id',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.$route.params.id
            }
          }
        )
        this.employees[0] = response.data
        console.log(authHeader())
      } catch (e) {
        console.log(e)
        console.log('Ошибка загрузки данных')
      }
    },
    async updateEmployee (updateReq) {
      try {
        axios.defaults.timeout = 600000
        const response = await axios.put('http://localhost:8080/api/auth/update',
          {
            empl: updateReq.employee,
            signInRequest: updateReq.signInRequest
          },
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            timeout: 500000
          }
        )
        console.log('********')
        console.log(response.status)
        if (response.data.token) {
          var u = response.data
          u.roles[0] = response.data.roles[0]
          localStorage.setItem('user', JSON.stringify(u))
          this.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
          this.$cookies.set('role', response.data.roles[0])
          window.$cookies.set('token', response.data.token, 60 * 60 * 24 * 30)
        }
        console.log(response.data)
        this.showModal = false
      } catch (e) {
        console.log(e)
        console.log('Ошибно обновления данных')
      }
    }
  },
  // computed: {
  //   currentUser () {
  //     return this.$store.state.auth.user
  //   }
  // },
  created () {
    this.fetchEmployee()
  }
}
</script>

<style scoped>

</style>
