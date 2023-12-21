<script setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps({modelValue: {type: String}});
const emits = defineEmits(["update:modelValue"]);
const borderOptions = [
  {value: "left", tip: "左边框", icon: "┣"},
  {value: "right", tip: "右边框", icon: "┫"},
  {value: "top", tip: "上边框", icon: "┳"},
  {value: "bottom", tip: "下边框", icon: "┻"},
  {value: "all", tip: "所有框", icon: "╋"},
]
</script>

<template>
  <div class="border-config-sides">
    <div v-for="option in borderOptions" :key="option.value"
         class="border-config-item" :class="{selected:modelValue===option.value,[option.value]:true}"
         @click="emits('update:modelValue',option.value)"
         :data-tip="option.tip">
      <span>{{ option.icon}}</span>
    </div>
  </div>
</template>

<style scoped>

.border-config-sides {
  flex: 0 0 80px;
  position: relative;
  width: 80px;
  height: 82px;
  color: var(--el-text-color);
}

.border-config-sides .border-config-item {
  position: absolute;
  font-size: 16px;
  line-height: 16px;
  padding: 4px;
  border-radius: 2px;
  --position-width: 28px;
  cursor: pointer;
}

.border-config-sides .border-config-item.selected,
.border-config-sides .border-config-item:hover {
  background: var(--el-color-info-light-3);
}

.border-config-sides .border-config-item.left {
  left: 0;
  top: var(--position-width);
}

.border-config-sides .border-config-item.top {
  top: 0;
  left: var(--position-width);
}

.border-config-sides .border-config-item.right {
  right: 0;
  top: var(--position-width);
}

.border-config-sides .border-config-item.bottom {
  bottom: 0;
  left: var(--position-width);
}

.border-config-sides .border-config-item.all {
  top: var(--position-width);
  left: var(--position-width);
}
</style>
