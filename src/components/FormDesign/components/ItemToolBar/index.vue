<script setup>
import {CirclePlusFilled} from "@element-plus/icons-vue";

const props = defineProps({title: {}});
const emits = defineEmits(["click"]);
</script>

<template>
  <div class="item-toolbar">
    <div class="title">
      {{ title }}
    </div>
    <div class="button">
      <ElLink type="primary" @click="emits('click')" class="add-btn" :underline="false"
              :icon="CirclePlusFilled">添加
      </ElLink>
    </div>
  </div>
</template>

<style scoped>
.item-toolbar {
  display: flex;
  justify-content: space-between;
}

.item-toolbar .title {
  font-weight: bold;
}

.add-btn {
  font-size: 12px;
  font-weight: bold;
}

.add-btn > :deep(i) {
  margin-right: 4px;
}
</style>
