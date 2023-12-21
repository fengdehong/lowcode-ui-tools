<script setup>
import {defineProps, onMounted, reactive, toRef, watch} from 'vue'

const regxp = /^(\d+)px (\S+) (\S+)$/;

const props = defineProps({
  modelValue: {type: String}
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = toRef(props, 'modelValue');

const borderConfig = reactive({width: 0, type: "none", color: "#FFFFFF"})
watch(modelValue, parseValue);
onMounted(parseValue);

function parseValue() {
  console.log("parse value:", modelValue.value);
  if (regxp.test(modelValue.value)) {
    const array = regxp.exec(modelValue.value);
    borderConfig.width = array[1];
    borderConfig.type = array[2];
    borderConfig.color = array[3];
  } else {
    Object.assign(borderConfig, {width: 0, type: "none", color: "#FFFFFF"});
  }
}

function onUpdate() {
  if (/^\d+$/.test(borderConfig.width)) {
    emits("update:modelValue", `${borderConfig.width}px ${borderConfig.type} ${borderConfig.color}`)
  } else {
    emits("update:modelValue", null)
  }
}
</script>

<template>
  <div>
    <div class="config-item">
      <span class="label">线宽：</span>
      <el-input placeholder="请输入线宽" type="number" v-model="borderConfig.width" @change="onUpdate">
        <template #suffix>px</template>
      </el-input>
    </div>
    <div class="config-item">
      <span class="label">线型：</span>
      <el-select v-model="borderConfig.type" placeholder="Select" style="width:106px" @change="onUpdate">
        <el-option label="无边框" value="none"/>
        <el-option label="实线" value="solid"/>
        <el-option label="点线" value="dotted"/>
        <el-option label="双线" value="double"/>
        <el-option label="虚线" value="dashed"/>
      </el-select>
    </div>
    <div class="config-item">
      <span class="label">线色：</span>
      <el-color-picker v-model="borderConfig.color" name="边框颜色" @change="onUpdate"/>
    </div>
  </div>
</template>

<style scoped>
.config-item {
  display: flex;
  align-items: center;
}

.config-item .label {
  flex: 0 0 50px;
}

.config-item + .config-item {
  margin-top: 12px;
}
</style>
