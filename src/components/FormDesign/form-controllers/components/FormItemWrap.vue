<script setup>

defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <ElFormItem :label="formItemConfig.label" :required="formItemConfig.required">
    <slot name="default"/>
    <p class="form-item-description">{{ formItemConfig.description }}</p>
  </ElFormItem>
</template>

<style scoped>
.form-item-description {
  color: var(--el-text-color-disabled);
  margin: 0;
}
</style>
