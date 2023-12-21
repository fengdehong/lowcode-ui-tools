<script setup>
import MonacoEditor from "@/components/MonacoEditor/index.vue";
import {computed} from "vue";

const props = defineProps({
  modelValue: {}
});
const emits = defineEmits(["update:modelValue"]);

const valueLocal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log("update:modelValue:", value);
    emits("update:modelValue", value);
  }
});
</script>

<template>
  <el-popover placement="left" width="min(calc(100vw - 400px),700px)" trigger="click">
    <template #reference>
      <el-button type="primary">编辑代码</el-button>
    </template>
    <MonacoEditor v-model="valueLocal" style="height: 600px"/>
  </el-popover>

</template>

<style scoped>

</style>
