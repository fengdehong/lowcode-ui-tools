<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <ElSelect v-model="form[model.formItemConfig.key]" :placeholder="model.customConfig.placeholder"
              style="width: 100%">
      <ElOption v-for="option in model.customConfig.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"/>
    </ElSelect>
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
