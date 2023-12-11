<template>
  <el-divider>输入框配置</el-divider>
  <el-form-item label="输入提示">
    <ElInput v-model="customConfig.placeholder"/>
  </el-form-item>
  <el-form-item label="输入类型">
    <ElSelect v-model="customConfig.type">
      <ElOption value="text" label="文本"/>
      <ElOption value="textarea" label="多行文本"/>
      <ElOption value="number" label="数字"/>
      <ElOption value="password" label="密码"/>
    </ElSelect>
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
