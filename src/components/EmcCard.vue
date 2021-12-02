<template>
<div class="card">
    <img :src="require('../assets/avatar.png')" alt="avatar" class="avatar__img">
    <div class="card__title">
      <p class="card__title__main">{{ patient.surName}} {{patient.name}} {{patient.patronymic}}</p>
<!--      <p class="card__title__second" >Дата последнего посещения: {{ d.date }}</p>-->
<!--      <p class="card__title__second">Последний диагноз: {{d.session.diagnosis.name}}</p>-->
    </div>
  <ui-list :type="2">
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{patient.phoneNumber}}</ui-item-text1>
            <ui-item-text2>Телефон</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{patient.email}}</ui-item-text1>
            <ui-item-text2>Почта</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{patient.snils}}</ui-item-text1>
            <ui-item-text2>Номер СНИСЛ</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{patient.insurancePolicy}}</ui-item-text1>
            <ui-item-text2>Страховой полис</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{patient.birthDate}}</ui-item-text1>
            <ui-item-text2>Дата рождения</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
    </ui-list>
  </div>
</template>

<script>
export default {
  name: 'EMC',
  props: {
    patient: {
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
  min-width: 70%;
  border-radius: 15px;
  padding: 24px;
  margin-left: 54px;
  background-color: white;
  margin-top: 30px;
  /*display: flex;*/
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
