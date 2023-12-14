<template>
  <Field
      v-model="form[model.formItemConfig.key]"
      :is-link="!readonly"
      readonly
      :name="model.formItemConfig.key"
      :label="model.formItemConfig.label"
      :placeholder="model.customConfig.placeholder"
      :required="model.formItemConfig.required"
      :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
      @click="!readonly && (showPicker = true)"
  />
  <Popup v-model:show="showPicker" position="bottom">
    <DatePicker @confirm="onConfirm" @cancel="showPicker = false"/>
  </Popup>
</template>

<script setup>
import {FormBaseController} from "../FormBaseController";
import {DatePicker, Field, Popup} from 'vant';
import 'vant/es/field/style';
import 'vant/es/date-picker/style';
import 'vant/es/popup/style';
import {ref} from "vue";

const props = defineProps({
  model: {type: FormBaseController},
  form: {type: Object, required: true},
  readonly: {type: Boolean, required: false}
});

const showPicker = ref(false);

function onConfirm({selectedValues}) {
  props.form[this.model.formItemConfig.key] = selectedValues.join('/');
  showPicker.value = false;
}
</script>

<style scoped>
.fen-text i {
  color: #337dff;
}

.fen-text .pre-icon {
  margin-right: 2px;
}

.fen-text .sub-icon {
  margin-left: 2px;
}
</style>
