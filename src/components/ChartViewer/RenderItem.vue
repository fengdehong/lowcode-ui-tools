<template>
  <Component :is="`${model.compType}${ChartEnv.isH5?'H5':''}`"
             :model="model"/>
</template>

<script setup>
import {ChartEnv} from "./ChartEnv.js";

const props = defineProps({
  model: {type: Object, required: true}
});

</script>

<style scoped>
</style>
