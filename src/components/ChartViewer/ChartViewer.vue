<script setup>
import {jsonConfigDeserialize} from "../FormDesign/utils/ControllerConfigUtils";
import RenderItem from "./RenderItem.vue";
import {ChartEnv} from "@/components/ChartViewer/ChartEnv.js";

const props = defineProps({
  json: {type: Object, required: true},
  readonly: {type: Boolean, default: false},
  isResult: {type: Boolean, default: false},
  formFields: {type: Array, required: true},
  controllers: {type: Array, required: true},
  isH5: {type: Boolean, default: false}
});
ChartEnv.isH5 = props.isH5;
jsonConfigDeserialize(props.json.list, props.controllers)

</script>

<template>
  <RenderItem v-for="element in json.list" :model="element"/>
</template>

<style scoped>

</style>
