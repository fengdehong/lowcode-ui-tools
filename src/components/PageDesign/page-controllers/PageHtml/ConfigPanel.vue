<template>
  <div>
    <el-form-item label="内容">
      <CodeConfig v-model="customConfig.html" style="width: 100%"/>
    </el-form-item>
  </div>
</template>
<script setup>
import CodeConfig from "@/components/FormDesign/components/CodeConfig/index.vue";

const props = defineProps({
  customConfig: {type: Object, required: true}
});

</script>
<style scoped>

</style>
