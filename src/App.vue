<template>
  <div>
  <div class="appBar">
    <img :src="require('./assets/logo.png')" class="headerImg" alt="logo">
    <div class="headerApp">
      <div class="headerSmall">федеральное государственное бюджетное учреждение</div>
      <div class="headerBig">«Консультативно-диагностический центр с поликлиникой»</div>
      <div class="headerSmall">Управления делами Президента Российской Федерации</div>
    </div>
  </div>
  <div class="main">
   <router-view></router-view>
  </div>
  </div>
</template>

<style>

*{
  margin: 0;
  padding: 0;
  max-width: max-content;
}

.main{
  margin-right: auto;
  margin-left: auto;
  padding-top:80px;
}

.appBar{
  width: 100%;
  padding-top: 10px;
  display: flex;
  padding-left: 30px;
  background-color: rgba(246, 252, 255, 1);
  /*position: fixed;*/
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
