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
th, tr, td, .table-bordered{
  border: 1px #515151 solid;
  font-size: 20px;
}
tr, td {
  padding: 10px;
}
</style>
