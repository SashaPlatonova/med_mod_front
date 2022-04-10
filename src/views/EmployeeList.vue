<template>
<div>
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите фамилию:"/>
    </div>
  <div class="cards">
    <div class="empl_cards">
    <employee-list-item
      v-for="s in searchEmployee"
      :employee="s"
      :key="s.id"
    />
  </div>
  <div class="filters_list">
    <li v-for="dep in departments" :key="dep.id" style="list-style: none">
      <input type="checkbox" id="cat" :value="dep.name" style="min-width: 50%" v-model="selectedDept" class="checkbox-other">
      <span>{{dep.name}}</span>
    </li>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import EmployeeListItem from '../components/EmployeeListItem'

export default {
  name: 'EmployeeList',
  components: {
    EmployeeListItem
  },
  data () {
    return {
      employees: [],
      currentList: [],
      departments: [],
      selectedDept: [],
      search: ''
    }
  },
  methods: {
    async fetchEmployee () {
      try {
        const response = await axios.get('http://localhost:8080/api/employee/find/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.employees = response.data
        this.currentList = this.employees
      } catch (e) {
        console.log(e)
      }
    },
    async fetchDepartments () {
      try {
        const response = await axios.get('http://localhost:8080/api/department/find/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.departments = response.data
        for (let i = 0; i < this.departments.length; i++) {
          this.selectedDept.push(this.departments[i].name)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchEmployee()
    this.fetchDepartments()
  },
  computed: {
    searchEmployee () {
      return this.currentList.filter(s => s.surName.toLowerCase().includes(this.search.toLowerCase()) &&
      this.selectedDept.includes(s.department.name))
    }
  }
}
</script>

<style scoped>
* {
  position: unset;
}

.search-wrapper {
  /*position: relative;*/
  margin-left: 54px;
  min-width: 70%;
  max-width: 70%;
  margin-top: 10px;
  height: 40px;
  margin-bottom: 54px;
  display: flex;
}

.filters_list {
  min-width: 400px;
  background: white;
  border-radius: 15px;
  margin-left: 54px;
  margin-top: 30px;
  margin-bottom: 60px;
  max-height: 1500px;
}
.filters_list li {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}

.cards{
  display: flex;
  /*justify-content: center;*/
  position: unset;
}

.empl_cards {
  display: flex;
  flex-direction: column;
}

 label {
   position: absolute;
   font-size: 12px;
   color: rgba(0, 0, 0, .50);
   top: 8px;
   left: 12px;
   z-index: -1;
   transition: .15s all ease-in-out;
 }
input {
  min-width: 100%;
  height: 40px;
  padding: 4px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 15px;
  transition: .15s all ease-in-out;
  background: white;
}
input:focus {
        outline: none;
        transform: scale(1.05);
      }
input:focus + label {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      input:focus + label::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
</style>
