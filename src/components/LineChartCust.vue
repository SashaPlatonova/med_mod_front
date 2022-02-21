<template>
  <LineChart :chartData="testData" :options="options"/>
</template>
<script>
import { computed, ref } from 'vue'
import { LineChart } from 'vue-chart-3'

export default {
  name: 'LineChartCust',
  components: { LineChart },
  props: {
    ind: {
      type: Object
    }
  },
  setup (props) {
    var dataValues = []
    var labl = []
    for (let i = 0; i < props.ind.length; i++) {
      dataValues.push(props.ind[i].value)
      labl.push(props.ind[i].date)
    }
    dataValues = ref(dataValues)
    const testData = computed(() => ({
      labels: labl,
      datasets: [
        {
          data: dataValues.value,
          label: props.ind[0].name,
          backgroundColor: [
            '#77CEFF',
            '#0079AF',
            '#123E6B',
            '#97B0C4',
            '#A5C8ED'
          ],
          hoverRadius: 10
        },
        {
          data: Array(props.ind.length).fill(props.ind[0].minValue),
          label: 'Минимально допустимое значение',
          backgroundColor: '#123E6B',
          borderColor: '#123E6B'
        },
        {
          data: Array(props.ind.length).fill(props.ind[0].maxValue),
          label: 'Максимально допустимое значение',
          borderColor: '#123E6B',
          backgroundColor: '#123E6B',
          fill: {
            target: 1,
            below: '#D1EBAB',
            above: '#D1EBAB'
          }
        }
      ]
    }))
    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Динамика'
        }
      }
    })
    return { testData, options }
  }
}

</script>

<style scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
