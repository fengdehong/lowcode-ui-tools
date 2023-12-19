<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  option: {type: Object, required: true}
});
/**
 *
 * @type {import("vue").Ref<HTMLDivElement>}
 */
const chartRef = ref(null);

onMounted(() => {
  let myChart = echarts.init(chartRef.value);
  myChart.setOption(props.option);
  const resizeObserver = new ResizeObserver(() => {
    const rect = chartRef.value.getBoundingClientRect();
    myChart.resize({width: rect.width, height: rect.height})
  });
  resizeObserver.observe(chartRef.value);
  onBeforeUnmount(() => resizeObserver.disconnect());
})
</script>

<template>
  <div ref="chartRef" class="chart-content"/>
</template>

<style scoped>
.chart-content {
  width: 100%;
  height: 100%;
}
</style>
