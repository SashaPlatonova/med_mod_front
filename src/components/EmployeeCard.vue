<template>
  <div class="card">
    <img :src="require('./assets/avatarRed.png')">
    <div>
      <p class="card__title__main">Фамилия Имя Отчетсво</p>
      <p class="card__title__second">Должность отделение</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard'
}
</script>

<style scoped>

.card{
  margin-left: 54px;
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
}

.card__title__main{
  font-size: 48px;
  color: #515151;
}

.card__title__second{
  font-size: 36px;
  color: #515151;
  padding-top: 30px;
}
</style>
