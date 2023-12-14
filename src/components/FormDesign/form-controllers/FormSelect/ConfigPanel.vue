<template>
  <el-divider>选择框配置</el-divider>
  <el-form-item label="输入提示">
    <ElInput v-model="customConfig.placeholder"/>
  </el-form-item>
  <OptionsConfig v-model="customConfig.options"/>
</template>
<script setup>
import OptionsConfig from "../components/OptionsConfig.vue";

defineProps({
  customConfig: {type: Object, required: true}
})
</script>
<style scoped>
.components-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 4px;
  background: #f5f7fa;

}

.icon-draggable {
  cursor: move;
}
</style>
