<script setup>

defineProps({config: {required: true}})
</script>

<template>
  <div>
    <el-divider>表单属性</el-divider>
    <el-form-item label="字段">
      <el-input v-model="config.key" disabled/>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="config.label"/>
    </el-form-item>
    <el-form-item label="必填">
      <ElSwitch v-model="config.required"/>
    </el-form-item>
    <el-form-item label="用于结果展示">
      <ElSwitch v-model="config.showOnResult"/>
    </el-form-item>
  </div>
</template>

<style scoped>

</style>
