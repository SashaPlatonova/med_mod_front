<template>
  <div class="conclusion" v-on:mouseup="changeColor()" v-on:mousemove="changeColor()" v-on:mouseover="changeColor"
       v-on:mouseleave="changeColor()">
<table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Название</th>
        <th>Значение</th>
        <th>Минимально допустимое значение</th>
        <th>Максимально допустимое значение</th>
        <th>Минимально допустимое значение (Жен)</th>
        <th>Максимально допустимое значение (Жен)</th>
        <th>Дата</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="indicator in indicators" v-bind:key="indicator">
        <td v-for="(value, key) in indicator" v-bind:key="key" class="valuesIndicator">{{value}}</td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ChangeTable',
  props: {
    indicators: {
      type: Object
    }
  },
  methods: {
    changeColor () {
      var arr = document.getElementsByTagName('tr')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].textContent.includes('false')) {
          // for (let j = 0; j < arr[i].childNodes.length; j++) {
          //   arr[i].childNodes[j].style.background = 'red'
          // }
          arr[i].style.color = 'red'
        }
      }
    }
  },
  created () {
    this.changeColor()
  }
}
</script>

<style scoped>
.conclusion{
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 54px;
  padding: 50px;
  border-radius: 15px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
  background: white;
  font-size: 20px;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.table caption {
  background: #efefef;
  text-align: center;
}
.table td {
  border: 1px solid #dddddd;
  padding: 5px;
}
</style>
