<template>
<div class="card">
    <img :src="require('../assets/avatar.png')" alt="avatar" class="avatar__img">
    <div class="card__title">
      <p class="card__title__main">{{ document.session.patient.surName}} {{document.session.patient.name}} {{document.session.patient.patronymic}}</p>
      <p class="card__title__second" >Дата последнего посещения: {{ document.date }}</p>
      <p class="card__title__second" v-if="document.session.diagnosis!=null">Последний диагноз: {{document.session.diagnosis.name}}</p>
    </div>
  <ul class="main__list">
            <li>{{document.session.patient.phoneNumber}}</li>
            <li class="second__list">Телефон</li>
            <li>{{document.session.patient.email}}</li>
            <li class="second__list">Электронная почта</li>
            <li>{{document.session.patient.snils}}</li>
            <li class="second__list">СНИЛС</li>
            <li>{{document.session.patient.insurancePolicy}}</li>
            <li class="second__list">Страховой полис</li>
            <li>{{document.session.patient.birthDate}}</li>
            <li class="second__list">Дата рождения</li>
      </ul>
  <div class="buttons">
    <custom-button @click="$router.push('/appointment/'+document.session.patient.id)">Записать</custom-button>
    <custom-button>Заключения</custom-button>
  </div>
  </div>

</template>

<script>
import CustomButton from './UI/Button'
export default {
  name: 'EMC',
  components: {
    CustomButton
  },
  props: {
    document: {
      type: Object
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
  max-width: 50%;
  position: unset;
  border-radius: 15px;
  padding: 24px;
  margin-left: 54px;
  background-color: white;
  margin-top: 30px;
  /*display: flex;*/
  margin-bottom: 60px;
  max-height: 890px;
}

.avatar__img{
  max-height: 216px;
  max-width: 216px;
}

.card__title{
  background-color: white;
  margin-left: 16px;
}

.card__title__main{
  font-size: 48px;
  color: #515151;
}

.main__list {
  padding: 10px;
  font-size: 18px;
  color: #212121;
}
.second__list {
  color: #7d7d7d;
  margin-bottom: 20px;
}

.card__title__second{
  font-size: 18px;
  color: #515151;
  padding-top: 30px;
  text-align: justify-all;
}

.buttons{
  display: flex;
  justify-content: flex-end;
  margin-left: 300px;
}
</style>
