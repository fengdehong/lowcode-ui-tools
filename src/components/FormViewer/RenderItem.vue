<template>
  <Component v-if="fieldVisible(model.formItemConfig)"
             :is="`${model.compType}${FormEnv.isH5?'H5':''}`"
             :model="model"
             :form="form"/>
</template>

<script setup>
import {useFormContext} from "../FormDesign/utils/useFormContext";
import {FormEnv} from "./FormEnv.js";

const props = defineProps({
  model: {type: Object, required: true}
});
const {form, fieldVisible} = useFormContext();

</script>

<style scoped>
</style>
