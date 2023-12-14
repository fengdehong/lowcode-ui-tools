<template>
  <el-divider>输入框配置</el-divider>
  <el-form-item label="输入提示">
    <ElInput v-model="customConfig.placeholder"/>
  </el-form-item>
  <el-form-item label="输入框高度（行数）">
    <ElInput v-model="customConfig.rows" type="number" :min="1"/>
  </el-form-item>
  <el-form-item label="显示字数限制">
    <el-switch v-model="customConfig.showWordLimit" @change="onShowWordLimitChange"/>
  </el-form-item>
  <el-form-item label="最大字数" v-if="customConfig.showWordLimit">
    <ElInput v-model="customConfig.wordLimit" type="number"/>
  </el-form-item>
</template>
<script setup>

const props = defineProps({
  customConfig: {type: Object, required: true}
});

function onShowWordLimitChange(e) {
  console.log("onShowWordLimitChange:", e);
  if (e) {
    props.customConfig.wordLimit = 300;
  } else {
    props.customConfig.wordLimit = null;
  }
}
</script>
<style scoped>

</style>
