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
  </ElFormItem>
</template>

<style scoped>

</style>
