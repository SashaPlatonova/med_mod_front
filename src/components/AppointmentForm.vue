<template>
<div class="container">
  <div class="row">
      <h4>Запись пациента на прием </h4>
      <div class="input-group input-group-icon">
        <label class="label">Пациент</label>
        <select v-model="patient">
          <option v-for="pat in patients" v-bind:key="pat.id" :value="pat">{{pat.surName }} {{pat.name}}</option>
        </select>
      </div>
      <div class="input-group input-group-icon">
        <label class="label">Отделение</label>
        <select v-model="department">
          <option v-for="dep in departments" v-bind:key="dep.id" :value="dep">{{dep.name}}</option>
        </select>
      </div>
      <div class="input-group input-group-icon">
        <label class="label">Сотрудник</label>
        <select v-model="employee">
          <option v-for="empl in initEmployees" v-bind:key="empl.id" :value="empl">{{empl.surName }} {{empl.name}}</option>
        </select>
      </div>
    <div class="input-group input-group-icon">
      <label class="label">Услуга</label>
        <select v-model="category">
          <option v-for="cat in categories" v-bind:key="cat.id" :value="cat">{{cat.name}}</option>
        </select>
    </div>
    <div class="input-group input-group-icon">
      <label class="label">Название приема</label>
        <input type="text" v-model="name"/>
        <div class="input-icon"><i class="fa fa-envelope"></i></div>
    </div>
    <div class="input-group input-group-icon">
      <label class="label">Кабинет</label>
        <input type="text" placeholder="Выберете кабинет" v-model="office" list="offices"/>
      <datalist id="offices">
          <option v-for="off in optionsOffice" v-bind:key="off" :value="off">{{off}}</option>
        </datalist>
    </div>
    <div class="input-group input-group-icon">
      <label class="label">Дата</label>
        <input type="text" placeholder="Выберете удобную дату" v-model="schedule.date"
               @click="$router.push('/schedule/' + employee.id)"/>
        <div class="input-icon"><i class="fa fa-envelope"></i></div>
    </div>
    <p class="message">{{message}}</p>
    </div>
    <div class="row buttons__row">
      <custom-button @click="resetForm">Сбросить</custom-button>
      <custom-button @click="addSession">Записать</custom-button>
    </div>
</div>
</template>

<script>
import Button from './UI/Button'
import axios from 'axios'
import dateFormater from '../services/dateFormater'
export default {
  name: 'AppointmentForm',
  components: Button,
  data () {
    return {
      employee: {},
      employees: [],
      department: {},
      departments: [],
      category: {},
      categories: [],
      patient: {},
      patients: [],
      date: {},
      schedule: {},
      name: '',
      office: null,
      offices: [],
      message: '',
      fromPath: '',
      sessionId: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromPath = from.path
    })
  },
  methods: {
    resetForm () {
      this.employee = {}
      this.patient = {}
      this.category = {}
      this.department = {}
      this.message = {}
      this.office = null
      this.date = null
      this.message = ''
      this.schedule = {}
      this.name = ''
    },
    initOffices () {
      for (let i = 100; i < 400; i++) {
        this.offices[i - 100] = i.toString()
      }
    },
    async initBoxes () {
      try {
        const response = await axios.get('http://localhost:8080/api/patient/find/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.patients = response.data
      } catch (e) {
        console.log(e)
      }
      try {
        const response = await axios.get('http://localhost:8080/api/department/find/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.departments = response.data
      } catch (e) {
        console.log(e)
      }
      try {
        const response = await axios.get('http://localhost:8080/api/document/all/categories',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.categories = response.data
      } catch (e) {
        console.log(e)
      }
      try {
        const response = await axios.get('http://localhost:8080/api/employee/find/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.employees = response.data
      } catch (e) {
        console.log(e)
      }
      if (this.fromPath.startsWith('/emc')) {
        console.log('from patients emc')
        try {
          const response = await axios.get('http://localhost:8080/api/patient/find/id',
            {
              headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
              params: {
                id: this.$route.params.id
              }
            }
          )
          this.patient = response.data
        } catch (e) {
          console.log(e)
        }
      }
      if (this.fromPath.startsWith('/schedule')) {
        try {
          const response = await axios.get('http://localhost:8080/api/schedule/find/id',
            {
              headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
              params: {
                id: this.$route.params.id
              }
            }
          )
          this.schedule = response.data
          this.schedule.date = dateFormater(this.schedule.date, true)
        } catch (e) {
          console.log(e)
        }
      }
    },
    async addSession () {
      try {
        const response = await axios.post('http://localhost:8080/api/document/add',
          {
            id: -1,
            sessionName: this.name,
            office: this.office,
            category: this.category,
            diagnosis: null,
            patient: this.patient,
            conclusion: this.category.conclusion
          },
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.sessionId = response.data
        console.log(response.status)
        console.log('session save successfully')
        if (response.status === 200) {
          await this.appointment(this.sessionId)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async appointment (session) {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/add/session',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.schedule.id,
              session: session
            }
          }
        )
        this.message = 'Пациент успешно записан'
        localStorage.removeItem('patient')
        localStorage.removeItem('department')
        localStorage.removeItem('category')
        localStorage.removeItem('employee')
        localStorage.removeItem('office')
        localStorage.removeItem('sessionName')
        console.log(response.status)
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    initEmployees () {
      return this.employees.filter(e => e.department.id === this.department.id)
    },
    optionsOffice () {
      return this.offices.filter(o => o.includes(this.office))
    }
  },
  watch: {
    employee (newEmpl) {
      const parsed = JSON.stringify(newEmpl)
      localStorage.setItem('employee', parsed)
    },
    category (newCat) {
      const parsed = JSON.stringify(newCat)
      localStorage.setItem('category', parsed)
    },
    patient (newPat) {
      const parsed = JSON.stringify(newPat)
      localStorage.setItem('patient', parsed)
    },
    office (newOffice) {
      localStorage.office = newOffice
    },
    department (newDep) {
      const parsed = JSON.stringify(newDep)
      localStorage.setItem('department', parsed)
    },
    date (newDate) {
      localStorage.dateSession = newDate
    },
    name (newName) {
      localStorage.sessionName = newName
    }
  },
  mounted () {
    this.initOffices()
    this.initBoxes()
    if (localStorage.getItem('employee')) {
      try {
        this.employee = JSON.parse(localStorage.getItem('employee'))
      } catch (e) {
        console.log(e)
      }
    }
    if (localStorage.patient) {
      try {
        this.patient = JSON.parse(localStorage.getItem('patient'))
      } catch (e) {
        console.log(e)
      }
    }
    if (localStorage.category) {
      try {
        this.category = JSON.parse(localStorage.getItem('category'))
      } catch (e) {
        console.log(e)
      }
    }
    if (localStorage.department) {
      try {
        this.department = JSON.parse(localStorage.getItem('department'))
      } catch (e) {
        console.log(e)
      }
    }
    if (localStorage.office) {
      this.office = localStorage.office
    }
    if (localStorage.dateSession) {
      this.date = localStorage.dateSession
    }
    if (localStorage.sessionName) {
      this.name = localStorage.sessionName
    }
  }
}
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  position: unset;
}
body {
  padding: 1em;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #b9b9b9;
  background-color: #e3e3e3;
}
h4 {
  color: #758A99;
  margin: 10px;
  font-size: 18px;
}
datalist {
  max-height: 200px;
}
input,textarea,
input[type="radio"] + label,
input[type="checkbox"] + label:before,
select option,
select {
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.label{
  align-self: center;
  padding-right: 10px;
  min-width: 130px;
  text-align: right;
}
input:focus, textarea:focus {
  outline: 0;
  border-color: #758A99;
}
input:focus + .input-icon i {
  color: #758A99;
}
input:focus + .input-icon:after {
  border-right-color: #758A99;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + label,
select {
  display: inline-block;
  /*width: 50%;*/
  text-align: center;
  float: left;
  border-radius: 0;
}
input[type="radio"] + label:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
input[type="radio"] + label:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
input[type="radio"] + label i {
  padding-right: 0.4em;
}
input[type="radio"]:checked + label,
input:checked + label:before,
select:focus,
select:active {
  background-color: #758A99;
  color: #fff;
  border-color: #758A99;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  position: relative;
  display: block;
  padding-left: 1.6em;
}
input[type="checkbox"] + label:before {
  position: absolute;
  top: 0.2em;
  left: 0;
  display: block;
  width: 1em;
  height: 1em;
  padding: 0;
  content: "";
}
input[type="checkbox"] + label:after {
  position: absolute;
  top: 0.45em;
  left: 0.2em;
  font-size: 0.8em;
  color: #fff;
  opacity: 0;
  font-family: FontAwesome;
  content: "\f00c";
}
input:checked + label:after {
  opacity: 1;
}
select {
  height: 3.4em;
  line-height: 8;
  font-size: 18px;
}
select:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
select:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
select:focus,
select:active {
  outline: 0;
}
select option {
  background-color: #758A99;
  color: #fff;
}
.input-group {
  margin-bottom: 1em;
  zoom: 1;
  display: flex;
  justify-content: space-between;
}
.input-group:before,
.input-group:after {
  content: "";
  display: table;
}
.input-group:after {
  clear: both;
}

.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.container {
  padding: 1em 3em 2em 3em;
  margin: 50px auto;
  max-width: 70%;
  max-height: 720px;
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.row {
  zoom: 1;
  max-width: 70%;
  margin-left: 15%;
  margin-top: 30px;
}
.buttons__row{
  display: flex;
  justify-content: flex-end;
}
.row:before,
.row:after {
  content: "";
  display: table;
}
.row:after {
  clear: both;
}
.col-half {
  padding-right: 10px;
  float: left;
  width: 50%;
}
.col-half:last-of-type {
  padding-right: 0;
}
.col-third {
  padding-right: 10px;
  float: left;
  width: 33.33333333%;
}
.col-third:last-of-type {
  padding-right: 0;
}
@media only screen and (max-width: 540px) {
  .col-half {
    width: 100%;
    padding-right: 0;
  }
}

.message {
  font-size: 16px;
  color: #7d7d7d;
  text-align: end;
}
</style>
