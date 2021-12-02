<template>
<div class="card">
  <p class="card__title">{{document.session.sessionName}}</p>
  <p class="card__text">Врач: {{document.employee.surName}}</p>
  <p class="card__text">Дата приема: {{document.date}}</p>
  <custom-button style="align-self: end">Смотреть отчет</custom-button>
</div>
</template>

<script>
import CustomButton from './UI/Button'
export default {
  name: 'DocCard',
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
* {
  background-color: white;
}
.card{
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 54px;
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
</style>
