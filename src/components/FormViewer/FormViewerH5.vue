<script setup>
import {Form} from "vant"
import "vant/es/form/style"
import "vant/es/cell/style"
import "vant/es/cell-group/style"
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
FormEnv.isH5 = true;
jsonConfigDeserialize(props.json.list, props.controllers)

function onSubmit(e) {
  console.log("submit:", props.form);
}
</script>

<template>
  <Form @submit="onSubmit">
    <RenderItem v-for="element in json.list" :model="element"/>
  </Form>
</template>

<style scoped>

</style>
