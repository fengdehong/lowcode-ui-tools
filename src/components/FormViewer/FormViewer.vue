<script setup>
import {provide, toRef} from "vue";
import {jsonConfigDeserialize} from "../FormDesign/utils/ControllerConfigUtils";
import {FormEnv} from "./FormEnv.js";
import RenderItem from "./RenderItem.vue";

const props = defineProps({
  json: {type: Object, required: true},
  readonly: {type: Boolean, default: false},
  isResult: {type: Boolean, default: false},
  formFields: {type: Array, required: true},
  controllers: {type: Array, required: true},
  form: {type: Object, required: true, default: () => Object.create({})}
});

provide("form", props.form);
provide("form-fields", props.formFields);
provide("form-readonly", toRef(props, 'readonly'));
provide("form-isResult", toRef(props, 'isResult'));
FormEnv.isH5 = false;
jsonConfigDeserialize(props.json.list, props.controllers)


</script>

<template>
  <ElForm label-position="top">
    <RenderItem v-for="element in json.list" :model="element"/>
  </ElForm>
</template>

<style scoped>

</style>
