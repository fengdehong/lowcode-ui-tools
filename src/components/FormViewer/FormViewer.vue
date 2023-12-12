<script setup>
import {provide, toRef} from "vue";
import {jsonConfigDeserialize} from "../FormDesign/utils/ControllerConfigUtils";
import RenderLayout from "./RenderLayout.vue";

const props = defineProps({
  json: {type: Object, required: true},
  readonly: {type: Boolean, default: false},
  isResult: {type: Boolean, default: false},
  formFields: {type: Array, required: true},
  controllers: {type: Array, required: true},
  form: {type: Object, required: true, default: () => Object.create({})}
});

console.log("props.json:", props.json);
console.log("form fields:", props.formFields);
provide("form", props.form);
provide("form-fields", props.formFields);
provide("form-readonly", toRef(props, 'readonly'));
provide("form-isResult", toRef(props, 'isResult'));
jsonConfigDeserialize(props.json.list, props.controllers)


</script>

<template>
  <ElForm label-position="top">
    <RenderLayout class="drawing-board" :list="json.list"/>
  </ElForm>
</template>

<style scoped>

</style>
