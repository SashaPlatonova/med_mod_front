<template>
  <employee-card :employee="employees[0]"/>
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
        console.log('****')
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
