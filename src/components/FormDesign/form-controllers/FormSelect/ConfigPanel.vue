<template>
  <el-divider>选择框配置</el-divider>
  <el-form-item label="输入提示">
    <ElInput v-model="customConfig.placeholder"/>
  </el-form-item>
  <el-form-item>
    <template #label>
      <ItemToolBar title="选项列表"
                   @click="customConfig.options.push({label:'新增选项',value:new Date().getTime()})"/>
    </template>
    <draggable class="options-draggable" :list="customConfig.options" item-key="value" handle=".icon-draggable">
      <template #item="{element}">
        <div class="components-item">
          <ElIcon class="icon-draggable">
            <Rank/>
          </ElIcon>
          <ElInput v-model="element.label" placeholder="名称"/>
          <ElInput v-model="element.value" placeholder="值"/>
        </div>
      </template>
    </draggable>
  </el-form-item>
</template>
<script setup>
import draggable from "vuedraggable";
import ItemToolBar from "../../components/ItemToolBar/index.vue";
import {Rank} from "@element-plus/icons-vue";

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
