<template>
  <el-divider>评分配置</el-divider>
  <el-form-item label="星数">
    <el-input type="number" v-model.number="customConfig.count"/>
  </el-form-item>
  <el-form-item label="允许半星">
    <ElSwitch v-model="customConfig.allowHalf"/>
  </el-form-item>
</template>
<script setup>
defineProps({
  customConfig: {type: Object, required: true}
})
</script>
<style scoped>

</style>
