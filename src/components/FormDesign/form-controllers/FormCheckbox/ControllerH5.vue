<template>
  <Field :name="model.formItemConfig.key"
         :label="model.formItemConfig.label"
         :placeholder="model.customConfig.placeholder"
         :required="model.formItemConfig.required"
         :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
         :readonly="readonly">
    <template #input>
      <CheckboxGroup direction="horizontal" v-model="form[model.formItemConfig.key]">
        <Checkbox v-for="option in model.customConfig.options" :key="option.value" :name="option.value" shape="square">
          {{ option.label }}
        </Checkbox>
      </CheckboxGroup>
    </template>
  </Field>
</template>

<script setup>
import {Checkbox, CheckboxGroup, Field} from 'vant'
import 'vant/es/field/style';
import 'vant/es/checkbox/style';
import 'vant/es/checkbox-group/style';

const props = defineProps({
  model: {type: Object},
  form: {type: Object, required: true},
  readonly: {type: Boolean, required: false},
});
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
