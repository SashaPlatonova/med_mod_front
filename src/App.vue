<template>
<div class="page">
  <header tabindex="0">
    <img :src="require('./assets/logo.png')" class="headerImg" alt="logo">
    <div class="headerApp">
      <div class="headerSmall">федеральное государственное бюджетное учреждение</div>
      <div class="headerBig">«Консультативно-диагностический центр с поликлиникой»</div>
      <div class="headerSmall">Управления делами Президента Российской Федерации</div>
    </div>
  </header>
  <div id="nav-container">
    <div class="bg"></div>
    <div class="button" tabindex="0">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </div>
    <div id="nav-content" tabindex="0">
      <ul class="navUl">
        <li class="navLi"><a href="#" @click="$router.push('/employee')">Аккаунт</a></li>
        <li class="navLi"><a href="#">Выход</a></li>
      </ul>
    </div>
  </div>

  <main>
    <router-view></router-view>
  </main>
</div>
</template>
<script>
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Encode+Sans+Condensed:400,600');

* {
  outline: none;
  margin: 0;
  padding: 0;
  /*max-width: max-content;*/
}

.headerApp{
  padding-top: 5px;
  padding-left: 10px;
  margin-bottom: 1px;
  padding-right: 20px;
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

strong {
  font-weight: 600;
}

.page {
  width: 100%;
  height: 100vh;
  background: rgba(246, 252, 255, 1);
  font-family: 'Encode Sans Condensed', sans-serif;
  font-weight: 600;
  letter-spacing: .03em;
  color: #212121;
}

header {
  display: flex;
  position: fixed;
  width: 100%;
  height: 70px;
  background: rgba(246, 252, 255, 1);
  color: #fff;
  justify-content: flex-end;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

main {
  margin-right: auto;
  margin-left: auto;
  padding-top:80px;
  max-width: 1700px;
}

#nav-container {
  position: fixed;
  height: 100vh;
  width: 100%;
  pointer-events: none;
}
#nav-container .bg {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  visibility: hidden;
  opacity: 0;
  transition: .3s;
  background: #7d7d7d;
}
#nav-container:focus-within .bg {
  visibility: visible;
  opacity: .6;
}
#nav-container * {
  visibility: visible;
}

.button {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  -webkit-appearance: none;
  border: 0;
  background: transparent;
  border-radius: 0;
  height: 70px;
  width: 30px;
  cursor: pointer;
  pointer-events: auto;
  margin-left: 25px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.icon-bar {
  display: block;
  width: 100%;
  height: 3px;
  background: #4f8ab2;
  transition: .3s;
}
.icon-bar + .icon-bar {
  margin-top: 5px;
}

#nav-container:focus-within .button {
  pointer-events: none;
}
#nav-container:focus-within .icon-bar:nth-of-type(1) {
  transform: translate3d(0,8px,0) rotate(45deg);
}
#nav-container:focus-within .icon-bar:nth-of-type(2) {
  opacity: 0;
}
#nav-container:focus-within .icon-bar:nth-of-type(3) {
  transform: translate3d(0,-8px,0) rotate(-45deg);
}

#nav-content {
  margin-top: 70px;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 70px);
  background: rgba(246, 252, 255, 1);
  pointer-events: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transform: translateX(-100%);
  transition: transform .3s;
  will-change: transform;
  contain: paint;
}

#nav-content .navUl {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#nav-content .navLi a {
  padding: 10px 5px;
  display: block;
  text-transform: uppercase;
  transition: color .1s;
}

#nav-content .navLi a:hover {
  color: #f7f7f7;
  background: #c4c4c4;
}

#nav-content .navLi:not(.small) + .small {
  margin-top: auto;
}

.small a {
  font-size: 12px;
  font-weight: 400;
  color: #888;
}
.small a + a {
  margin-left: 15px;
}

#nav-container:focus-within #nav-content {
  transform: none;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

a,
a:visited,
a:focus,
a:active,
a:link {
  text-decoration: none;
  outline: 0;
}

a {
  color: currentColor;
  transition: .2s ease-in-out;
}

h1, h2, h3, h4 {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

img {
  vertical-align: middle;
  height: auto;
  width: 100%;
}
</style>
