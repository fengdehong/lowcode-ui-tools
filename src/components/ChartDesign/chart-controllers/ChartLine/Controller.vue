<template>
  <ChartBase :option="option"/>
</template>

<script setup>


import ChartBase from "../ChartBase.vue";

const props = defineProps({
  model: {},
});

/**
 *
 * @type {import("echarts").LineSeriesOption}
 */
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
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};


</script>

<style scoped>

</style>
