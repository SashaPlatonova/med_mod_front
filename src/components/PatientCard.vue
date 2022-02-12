<template>
<div class="card">
    <img :src="require('../assets/avatar.png')" alt="avatar" class="avatar__img">
    <div class="card__title">
      <p class="card__title__main" @click="show= !show">{{ schedule.session.patient.surName}} {{schedule.session.patient.name}} {{schedule.session.patient.patronymic}}</p>
      <div v-show="show">
        <p class="card__title__second" v-if="schedule.session!=null">Дата последнего посещения: {{ schedule.date }}</p>
        <p v-else class="card__title__second">Этоо пациент еще не был у Вас на приеме</p>
        <p class="card__title__second" v-if="schedule.session.diagnosis!=null">Последний диагноз: {{schedule.session.diagnosis.name}}</p>
        <p v-else class="card__title__second">Нет диагнозов</p>
      </div>
    </div>
    <div class="button__card">
      <custom-button @click="$router.push('/emc/' + schedule.session.patient.id)">ЭМК</custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from './UI/Button'
export default {
  name: 'PatientCard',
  components: {
    CustomButton
  },
  props: {
    schedule: {
      type: Object
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

*{
  background: white;
  position: unset;
}

.card{
  max-width: 70%;
  border-radius: 15px;
  padding: 24px;
  margin-left: 54px;
  background-color: white;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}

.avatar__img{
  max-height: 216px;
  max-width: 216px;
}
.button__card{
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.single__button{
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  margin-bottom: 60px;
}

.card__title{
  background-color: white;
  margin-left: 30px;
}

.card__title__main{
  font-size: 48px;
  color: #515151;
}

.card__title__second{
  font-size: 32px;
  color: #515151;
  padding-top: 30px;
  text-align: justify-all;
}
</style>
