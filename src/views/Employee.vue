<template>
  <employee-card :employee="employees[0]"/>
</template>

<script>
import EmployeeCard from '../components/EmployeeCard'
import axios from 'axios'
export default {
  name: 'Employee',
  components: {
    EmployeeCard
  },
  data () {
    return {
      employees: []
    }
  },
  methods: {
    async fetchEmployee () {
      try {
        const response = await axios.get('http://localhost:8080/api/employee/find/id',
          {
            params: {
              id: 1
            }
          }
        )
        this.employees[0] = response.data
        console.log(this.employees.name)
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchEmployee()
  }
}
</script>

<style scoped>

</style>
