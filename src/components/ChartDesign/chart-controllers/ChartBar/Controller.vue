<template>
  <div ref="chartRef" class="chart-content"/>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";


const props = defineProps({
  model: {},
});
const chartRef = ref(null);
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};
onMounted(() => {
  let myChart = echarts.init(chartRef.value);
  myChart.setOption(option);
})

</script>

<style scoped>
.chart-content {
  width: 100%;
  height: 200px;
}
</style>
