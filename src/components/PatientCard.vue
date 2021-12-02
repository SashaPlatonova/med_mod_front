<template>
<div class="card">
    <img :src="require('../assets/avatar.png')" alt="avatar" class="avatar__img">
    <div class="card__title">
      <p class="card__title__main">{{ patient.surName}} {{patient.name}} {{patient.patronymic}}</p>
<!--      <p class="card__title__second" >Дата последнего посещения: {{ d.date }}</p>-->
<!--      <p class="card__title__second">Последний диагноз: {{d.session.diagnosis.name}}</p>-->
    </div>
    <div class="button__card">
      <custom-button @click="$router.push('/emc/' + patient.id)">ЭМК</custom-button>
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
    patient: {
      type: Object
    },
    d: {
      type: Object
    }
  }
}
</script>

<style scoped>

*{
  background: white;
}

.card{
  max-width: 70%;
  border-radius: 15px;
  padding: 24px;
  margin-left: 54px;
  background-color: white;
  margin-top: 30px;
  display: flex;
  margin-bottom: 60px;
}

.avatar__img{
  max-height: 216px;
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
