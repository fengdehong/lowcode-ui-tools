<template>
  <el-divider>输入框配置</el-divider>
  <el-form-item label="输入提示">
    <ElInput v-model="customConfig.placeholder"/>
  </el-form-item>
  <el-form-item label="多行文本">
    <ElSwitch v-model="customConfig.isTextarea"/>
  </el-form-item>
</template>
<script setup>
defineProps({
  customConfig: {type: Object, required: true}
})
</script>
<style scoped>

</style>
