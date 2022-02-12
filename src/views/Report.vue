<template>
<div class="cards">
  <div class="table__card">
  <table class="table table-striped table-bordered">
    <thead>
    <tr>Отчет о приеме</tr>
    </thead>
    <tbody>
      <tr v-for="i in session.conclusion.length" v-bind:key="i">
        <td v-for="(v, k) in session.conclusion[i]" v-bind:key="k" class="valuesIndicator">
          <textarea v-if="k==='Значение' || v===''" v-model="session.conclusion[i].Значение"></textarea>
          <p v-else>{{v}}</p>
        </td>
      </tr>
    </tbody>
  </table>
  <custom-button @click="updateSession">Завершить</custom-button>
  </div>
  <div class="doc_cards">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите название:"/>
  </div>
    <DocCard v-for="doc in searchDoc"
           :document="doc"
           :key="doc.id"/>
  </div>
</div>
</template>

<script>
import DocCard from '../components/DocCard'
import axios from 'axios'
import CustomButton from '../components/UI/Button'

export default {
  name: 'Report',
  components: {
    CustomButton,
    DocCard
  },
  data () {
    return {
      documents: [],
      session: {},
      search: ''
    }
  },
  methods: {
    async fetchSessionInfo () {
      try {
        const response = await axios.get('http://localhost:8080/api/document/find/id',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.$route.params.id
            }
          }
        )
        this.session = response.data
        if (this.session != null) {
          await this.fetchDocument()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async fetchDocument () {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/find/patient/id',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.session.patient.id
            }
          }
        )
        this.documents = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async updateSession () {
      try {
        const response = await axios.put('http://localhost:8080/api/document/update',
          {
            id: this.session.id,
            sessionName: this.session.sessionName,
            office: this.session.office,
            category: this.session.category,
            patient: this.session.patient,
            diagnosis: this.session.diagnosis,
            conclusion: this.session.conclusion
          },
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        console.log(response.status)
        if (response.status === 200) {
          this.$router.push('/emc/' + this.session.patient.id)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    searchDoc () {
      return this.documents.filter(d => d.session.sessionName.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created () {
    this.fetchSessionInfo()
  }
}
</script>

<style scoped>
* {
  position: unset;
}
.table{
  margin-top: 20px;
  margin-bottom: 20px;
 }
th, tr, td, .table-bordered{
  border: 1px #515151 solid;
  font-size: 20px;
  background-color: white;
}
tr, td {
  padding: 10px;
}
td{
  min-width: 400px;
  min-height: min-content;
}
.search-wrapper {
  position: relative;
  margin-left: 54px;
  min-width: 70%;
  height: 30px;
  margin-bottom: 54px;
}

input {
  min-width: 100%;
  height: 30px;
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
.cards{
  display: flex;
  justify-content: space-between;
}
.doc_cards{
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 30px;
}
textarea{
  border: white;
  resize: none;
  font-size: 20px;
}
</style>
