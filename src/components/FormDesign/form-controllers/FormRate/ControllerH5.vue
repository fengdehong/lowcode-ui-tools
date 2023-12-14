<template>
  <Field :name="model.formItemConfig.key"
         :label="model.formItemConfig.label"
         :required="model.formItemConfig.required"
         :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
         :readonly="readonly"
  >
    <template #input>
      <Rate v-model="form[model.formItemConfig.key]"
            color="#f7ba2a"
            :allowHalf="model.customConfig.allowHalf"
            :count="model.customConfig.count"
      />
    </template>
  </Field>
</template>

<script setup>
import {Field, Rate} from 'vant'
import "vant/es/field/style"
import "vant/es/rate/style"

defineProps({
  model: {type: Object, required: true},
  form: {type: Object, required: true},
  readonly: {type: Boolean, required: false},
})
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
