<template>
  <ChartBase :option="option"/>
</template>

<script setup>
import ChartBase from "@/components/ChartDesign/chart-controllers/ChartBase.vue";


const props = defineProps({
  model: {},
});
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


</script>

<style scoped>

</style>
