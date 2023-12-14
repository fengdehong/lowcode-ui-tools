<template>
  <Field type="textarea"
         v-model="form[model.formItemConfig.key]"
         :name="model.formItemConfig.key"
         :label="model.formItemConfig.label"
         :placeholder="model.customConfig.placeholder"
         :required="model.formItemConfig.required"
         :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
         :readonly="readonly"
         :rows="model.customConfig.rows"
         :maxlength="model.customConfig.wordLimit"
         :show-word-limit="model.customConfig.showWordLimit"
  />
</template>

<script setup>
import {Field} from 'vant'
import "vant/es/field/style"

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
