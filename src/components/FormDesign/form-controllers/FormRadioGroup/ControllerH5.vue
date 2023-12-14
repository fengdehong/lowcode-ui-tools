<template>
  <Field v-model="form[model.formItemConfig.key]"
         :name="model.formItemConfig.key"
         :label="model.formItemConfig.label"
         :placeholder="model.customConfig.placeholder"
         :required="model.formItemConfig.required"
         :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
         :readonly="readonly">
    <template #input>
      <RadioGroup v-model="form[model.formItemConfig.key]" direction="horizontal">
        <Radio v-for="option in model.customConfig.options" :key="option.value" :name="option.value">
          {{ option.label }}
        </Radio>
      </RadioGroup>
    </template>
  </Field>
</template>

<script setup>
import {Field, Radio, RadioGroup} from 'vant'
import 'vant/es/field/style';
import 'vant/es/radio/style';
import 'vant/es/radio-group/style';

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
