<template>
<div class="cards">
  <div class="table__card">
  <table class="table">
    <caption>Отчет о приеме</caption>
    <thead>
      <tr>
        <th v-for="(value, key) in session.category.structure[0]" v-bind:key="key">{{key}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(e, i) in session.category.structure.length" v-bind:key="i">
        <td v-for="(v, k) in session.category.structure[i]" v-bind:key="k" class="valuesIndicator">
          <textarea v-if="k==='Значение' || v===''" v-model="session.category.structure[i].Значение"></textarea>
          <p v-else>{{v}}</p>
        </td>
      </tr>
      <tr v-if="access">
        <td>Диагноз</td>
        <td>
          <input v-model="diagCode" list="diagnosis"/>
          <datalist id="diagnosis">
          <option v-for="d in searchDiagnosis" v-bind:key="d.id" :value="d.code">{{d.name}}</option>
        </datalist>
        </td>
      </tr>
    </tbody>
  </table>
  <custom-button @click="updateSession">Завершить</custom-button>
    <custom-button @click="fetchStandart">Рекомендации</custom-button>
  </div>
  <div class="doc_cards">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите название:"/>
  </div>
    <standart v-if="showStan">
      <slot>
        <div v-html="content" class="standart">
        </div>
        <div class="buttons__row">
        <custom-button @click="showStan=false">Скрыть</custom-button>
        <custom-button @click="isFull= !isFull">{{buttonText[Number(isFull)]}}</custom-button>
        </div>
      </slot>
    </standart>
    <DocCard v-else v-for="doc in searchDoc"
           :document="doc"
           :key="doc.id"/>
  </div>
</div>
</template>

<script>
import DocCard from '../components/DocCard'
import axios from 'axios'
import CustomButton from '../components/UI/Button'
import Standart from '../components/Standart'
import dateFormater from '../services/dateFormater'

export default {
  name: 'Report',
  components: {
    CustomButton,
    DocCard,
    Standart
  },
  data () {
    return {
      documents: [],
      session: {},
      search: '',
      showStan: false,
      content: '',
      diagnosis: [],
      diagCode: '',
      d: null,
      buttonText: ['Показать все', 'Только лечение'],
      fullDoc: '',
      treatment: '',
      isFull: false,
      access: false
    }
  },
  methods: {
    async fetchStandart () {
      await this.getDiagnosis()
      if (this.d != null) {
        this.showStan = true
        try {
          const response = await axios.get(this.d.standart.docName)
          const arr = response.data.obj.sections
          for (let i = 0; i <= arr.length; i++) {
            this.fullDoc += arr[i].content
            if (arr[i].title.indexOf('Лечение') !== -1) {
              this.treatment = arr[i].content
              this.content = this.treatment
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    async fetchDiagnosis () {
      try {
        const response = await axios.get('http://localhost:8080/api/diagnosis/all',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.diagnosis = response.data
      } catch (e) {
        console.log(e)
      }
    },
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
        for (const doc of response.data) {
          if (doc.session.conclusion != null) {
            doc.date = dateFormater(doc.date, true)
            this.documents.push(doc)
          }
        }
        // this.documents = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async getDiagnosis () {
      if (this.diagCode !== '') {
        try {
          const response = await axios.get('http://localhost:8080/api/diagnosis/find/code',
            {
              headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
              params: {
                code: this.diagCode
              }
            }
          )
          this.d = response.data
        } catch (e) {
          console.log(e)
        }
      }
    },
    async updateSession () {
      if (this.d == null) {
        await this.getDiagnosis()
      }
      try {
        const response = await axios.put('http://localhost:8080/api/document/update',
          {
            id: this.session.id,
            sessionName: this.session.sessionName,
            office: this.session.office,
            category: this.session.category,
            patient: this.session.patient,
            diagnosis: this.d,
            conclusion: this.session.category.structure
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
    },
    searchDiagnosis () {
      return this.diagnosis.filter(d => d.name.toLowerCase().includes(this.diagCode.toLowerCase()))
    }
  },
  watch: {
    isFull () {
      if (this.isFull) {
        this.content = this.fullDoc
      } else {
        this.content = this.treatment
      }
    }
  },
  created () {
    if (localStorage.getItem('user')) {
      var user = JSON.parse(localStorage.getItem('user'))
      if (user.roles[0] === 'ROLE_USER') {
        this.access = true
      }
    }
    this.fetchSessionInfo()
    this.fetchDiagnosis()
  }
}
</script>

<style scoped>
* {
  position: unset;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
  background: white;
  font-size: 20px;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.table caption {
  background: #efefef;
  text-align: center;
}
.table td {
  border: 1px solid #dddddd;
  padding: 5px;
}
.search-wrapper {
  position: relative;
  margin-left: 54px;
  min-width: 70%;
  height: 30px;
  margin-bottom: 54px;
}
.standart{
  background-color: white;
  max-height: 1800px;
  padding: 20px;
  overflow: scroll;
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
  min-width: 400px;
}

datalist {
  max-height: 200px;
}

.buttons__row{
  display: flex;
  justify-content: space-between;
}
</style>
