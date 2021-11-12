<template>
  <div class="appBar">
    <img :src="require('./assets/logo.png')" class="headerImg" alt="logo">
    <div class="headerApp">
      <div class="headerSmall">федеральное государственное бюджетное учреждение</div>
      <div class="headerBig">«Консультативно-диагностический центр с поликлиникой»</div>
      <div class="headerSmall">Управления делами Президента Российской Федерации</div>
    </div>
  </div>
</template>

<style>

*{
  margin: 0;
  padding: 0;
}

.body{
  background-color: rgba(246, 252, 255, 1);
}

.appBar{
  width: 100%;
  display: flex;
  padding-left: 30px;
  /*justify-content: space-between;*/
  background-color: rgba(246, 252, 255, 1);
}

.headerApp{
  padding-top: 5px;
  padding-left: 10px;
  margin-bottom: 1px;
}

.headerImg{
  max-width: 60px;
}

.headerBig{
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 4px;
  color: #7d7d7d;
  font-weight: 700;
}

.headerSmall{
  font-size: 11px;
  color: #4f8ab2;
}

</style>
