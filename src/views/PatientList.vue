<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите фамилию:"/>
        <label>Фамилия пациента:</label>
      <custom-button class="patientButton" @click="my = !my">Мои пациенты</custom-button>
    </div>
    <patient-card
      v-for="s in searchPatient"
      :schedule="s"
      :key="s.id"
    />
  </div>
</template>

<script>
import PatientCard from '../components/PatientCard'
import axios from 'axios'
import CustomButton from '../components/UI/Button'

export default {
  name: 'PatientList',
  components: {
    CustomButton,
    PatientCard
  },
  data () {
    return {
      schedules: [],
      my: false,
      search: ''
    }
  },
  methods: {
    async fetchPatient () {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/find/all/ordered',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.schedules = response.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchPatient()
  },
  computed: {
    searchPatient () {
      if (this.my) {
        return this.schedules.filter(s => s.employee.id === (this.$route.params.id) &&
          s.session.patient.surName.toLowerCase().includes(this.search.toLowerCase()))
      }
      return this.schedules.filter(s => s.session.patient.surName.toLowerCase().includes(this.search.toLowerCase()))
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

.patientButton{
  min-width: 150px;
  padding: 10px;
  margin-top: 0;
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
