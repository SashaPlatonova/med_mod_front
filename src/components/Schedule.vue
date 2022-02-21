<template>
  <div class="container">
    <vue-cal selected-date="2022-01-28"
         :time-from="8 * 60"
         :time-to="24 * 60"
          locale="ru"
         allDayBarHeight="40px"
         timeCellHeight="100"
         :disable-views="['years', 'year']"
         :events="events"
         :editable-events = "{ title: false, drag: true, resize: true, delete: true, create: false }"
         @event-delete="deleteEvent"
         :on-event-click="onEventClick">
</vue-cal>

<modal v-if="showDialog">
  <template v-slot:header>
    <div class="card_title">
      <i class="material-icons">enhanced_encryption</i>
<!--        <v-icon>{{ selectedEvent.icon }}</v-icon>-->
        <span>{{ selectedEvent.title }}</span>
        <div class="spacer"></div>
        <strong>{{ selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY') }}</strong>
      </div>
  </template>
  <template v-slot:body>
    <div class="card">
      <div class="card_text">
        <p v-html="selectedEvent.contentFull"/>
        <strong>Детали:</strong>
        <ul>
          <li>Начало приема: {{ selectedEvent.start && selectedEvent.start.formatTime() }}</li>
          <li>Окончание приема: {{ selectedEvent.end && selectedEvent.end.formatTime() }}</li>
        </ul>
      </div>
    </div>
    </template>
  <template v-slot:footer>
    <custom-button @click="showDialog=false">Закрыть</custom-button>
    <custom-button v-if="selectedEvent.title==='Свободно'"
                   @click="$router.push('/appointment/'+selectedEvent.scheduleId)">Записать</custom-button>
    <custom-button v-else @click="$router.push('/report/'+selectedEvent.id)">Провести прием</custom-button>
  </template>
</modal>
  </div>

</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/ru'
import 'vue-cal/dist/vuecal.css'
import Modal from './UI/Modal'
import CustomButton from './UI/Button'
import axios from 'axios'

export default {
  name: 'Schedule',
  components: {
    CustomButton,
    Modal,
    VueCal
  },
  data: () => ({
    selectedEvent: {},
    showDialog: false,
    sessions: [],
    events: []
  }),
  methods: {
    onEventClick (event, e) {
      this.selectedEvent = event
      this.showDialog = true
      e.stopPropagation()
    },
    async fetchSessions () {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/find/employee/id',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.$route.params.id
            }
          }
        )
        this.sessions = response.data
        for (let i = 0; i < this.sessions.length; i++) {
          var date = new Date(this.sessions[i].date)
          var month = date.getMonth() + 1
          var day = date.getDate()
          var year = date.getFullYear()
          var hours = date.getHours()
          var endsHours = (date.getHours() + 1)
          var minutes = date.getMinutes()
          minutes = (minutes < 10) ? '0' + minutes : minutes
          hours = (hours < 10) ? '0' + hours : hours
          endsHours = (endsHours < 10) ? '0' + endsHours : endsHours
          month = (month < 10) ? '0' + month : month
          day = (day < 10) ? '0' + day : day
          var startDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
          var endDate = year + '-' + month + '-' + day + ' ' + endsHours + ':' + minutes
          var title = null
          var patient = null
          var content = null
          var id = null
          var scheduleId = this.sessions[i].id
          if (this.sessions[i].session != null) {
            title = this.sessions[i].session.sessionName
            patient = this.sessions[i].session.patient.surName + ' ' + this.sessions[i].session.patient.name
            content = 'Пациент: ' + patient + '<br>' + 'Дата рождения:' +
              this.sessions[i].session.patient.birthDate + '<br>' + '<strong>Контакты</strong>' + '<br>' +
              this.sessions[i].session.patient.phoneNumber +
              ' ' + this.sessions[i].session.patient.email + '<br>' +
              'Кабинет: ' + this.sessions[i].session.office
            id = this.sessions[i].session.id
          }
          this.events.push({
            start: startDate,
            end: endDate,
            title: (title == null ? 'Свободно' : title),
            content: (patient == null ? '' : patient),
            contentFull: content,
            class: 'health',
            id: id,
            scheduleId: scheduleId
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async deleteEvent (event, e) {
      try {
        const response = await axios.delete('http://localhost:8080/api/document/delete',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: event.id
            }
          }
        )
        console.log(response)
        e.stopPropagation()
        this.$router.go()
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchSessions()
  }
}
</script>

<style>

.container{
  height: 850px;
}
.vuecal__menu, .vuecal__cell-events-count {background-color: rgba(90,172,218,0.56);}
.vuecal__title-bar {background-color: rgba(90,172,218,0.2);}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(90,172,218,0.1);}
.vuecal__cell--selected:before {border-color: rgba(90,172,218,0.3);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
.vuecal__event {cursor: pointer;}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}
.vuecal__event {
  background-color: rgba(254,157,157,0.6);
  color: #212121;
  border-radius: 30px;
  padding: 10px;
}

.card{
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0,0,0,.87);
  border-width: thin;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow,opacity,-webkit-box-shadow;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
}
.card_title{
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: .0125em;
  padding: 16px 24px 10px;
  line-height: 2rem;
  word-break: break-all;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(246, 252, 255, 1);
}
.card_text{
  color: rgba(0,0,0,.6);
  padding: 0 24px 20px;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: .0071428571em;
}
.spacer{
  webkit-box-flex: 1!important;
  -ms-flex-positive: 1!important;
  flex-grow: 1!important;
}
</style>
