<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <el-rate v-model="form[model.formItemConfig.key]"
             :readonly="readonly"
             :allowHalf="model.customConfig.allowHalf"
             :max="model.customConfig.count"
    />
  </FormItemWrap>
</template>

<script setup>
import FormItemWrap from "../components/FormItemWrap.vue";

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
