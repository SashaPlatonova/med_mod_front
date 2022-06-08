<template>
<div class="card" v-if="!showConc && !showIndicators && !openPhoto">
  <p class="card__title">{{document.session.sessionName}}</p>
  <p class="card__text">Врач: {{document.employee.surName}}</p>
  <p class="card__text">Дата приема: {{document.date}}</p>
  <custom-button v-if="document.session.conclusion!=null" style="align-self: end" @click="this.showConc=true">Смотреть отчет</custom-button>
  <p v-else class="card__text">Отчет недоступен</p>
</div>
  <div v-else-if="showConc" class="conclusion" v-on:mouseup="changeColor()" v-on:mousemove="changeColor()" v-on:mouseover="changeColor"
       v-on:mouseleave="changeColor()">
    <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th v-for="(value, key) in document.session.conclusion[0]" v-bind:key="key">{{key}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="conc in document.session.conclusion" v-bind:key="conc">
        <template v-if="conc.Значение.includes('jpg')">
          <td>Материалы</td>
          <td><custom-button v-if="document.session.category.id === 7" style="height: 45px" @click="fetchMedia(document.session.id)">Открыть</custom-button></td>
          </template>
        <template v-else>
          <td v-for="(value, key) in conc" v-bind:key="key" class="valuesIndicator"
            @click="this.fetchAnalysis(conc.Название); showIndicators=true; showConc=false">{{value}}</td>
        </template>
      </tr>
    </tbody>
    </table>
    <div class="buttons">
    <custom-button style="align-self: end" @click="this.showConc=false">Скрыть</custom-button>
    </div>
  </div>
  <div v-else-if="showIndicators" class="conclusion">
    <change-table :indicators="indicators"></change-table>
    <line-chart-cust v-if="loaded" :ind="indicators"></line-chart-cust>
    <custom-button style="align-self: end" @click="this.showIndicators=false; showConc=true">Скрыть</custom-button>
  </div>
  <div v-if="openPhoto" class="conclusion">
    <div v-for="l in links" v-bind:key="l">
      <img :src="require('../assets/img/' + l)" alt="result" class="media">
    </div>
    <custom-button style="align-self: end" @click="this.openPhoto=false; showConc=true">Скрыть</custom-button>
  </div>
</template>

<script>
import CustomButton from './UI/Button'
import axios from 'axios'
import ChangeTable from './ChangeTable'
import LineChartCust from './LineChartCust'
import dateFormater from '../services/dateFormater'
export default {
  name: 'DocCard',
  components: {
    LineChartCust,
    ChangeTable,
    CustomButton
  },
  props: {
    document: {
      type: Object
    }
  },
  data () {
    return {
      showConc: false,
      showIndicators: false,
      indicators: [],
      loaded: false,
      openPhoto: false,
      links: []
    }
  },
  methods: {
    changeColor () {
      var arr = document.getElementsByTagName('tr')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].textContent.includes('нет')) {
          var children = arr[i].children
          children[1].style.background = '#FFA2A2'
          // for (let j = 0; j < children.length; j++) {
          //   children[j].style.background = '#FFA2A2'
          // }
        }
      }
    },
    async fetchAnalysis (name) {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/find/patient/indicator',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.document.session.patient.id,
              name: name
            }
          }
        )
        this.indicators = []
        for (const indicator of response.data) {
          indicator.date = dateFormater(indicator.date, false)
          this.indicators.push(indicator)
        }
        if (response.status === 200) {
          this.loaded = true
        }
      } catch (e) {
        console.log(e)
      }
    },
    async fetchMedia (id) {
      try {
        const response = await axios.get('http://localhost:8080/api/document/media',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: id
            }
          }
        )
        this.links = response.data
        this.showConc = false
        this.openPhoto = true
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
* {
  background-color: white;
}
.card{
  position: unset;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 54px;
  padding: 50px;
  border-radius: 15px;
}
.card__title{
  font-size: 24px;
  margin: 20px;
}
.card__text{
  font-size: 18px;
  margin: 20px;
  color: #515151;
}

.conclusion{
  display: flex;
  flex-direction: column;
  min-width: 700px;
  margin-bottom: 54px;
  padding: 50px;
  border-radius: 15px;
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

.buttons{
  display: flex;
  justify-content: flex-end;
  margin-left: 30px;
}

.media {
  margin-top: 20px;
}
</style>
