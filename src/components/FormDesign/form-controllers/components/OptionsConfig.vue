<script setup>
import draggable from "vuedraggable";
import {Delete, Edit, Rank} from "@element-plus/icons-vue";
import {computed} from "vue";
import ItemToolBar from "../../components/ItemToolBar/index.vue";
import {nanoid} from "nanoid";

const props = defineProps({
  modelValue: {type: Array, default: () => []}
});
const emits = defineEmits(["update:modelValue"]);
const valueLocal = computed({
  get() {
    return [...props.modelValue];
  },
  set(val) {
    emits("update:modelValue", val);
  }
});

function onAddItem() {
  /**
   * @type {Array<{key:String,value:String,label:String}>}
   */
  let old = valueLocal.value;
  old.push({key: nanoid(), label: '新增选项', value: '新增选项'});
  valueLocal.value = old;
}

function onDeleteItem(key) {
  /**
   * @type {Array<{key:String,value:String,label:String}>}
   */
  let old = valueLocal.value;
  const index = old.findIndex(item => item.key === key);
  old.splice(index, 1);
  valueLocal.value = old;
}
</script>

<template>
  <el-divider>选择框配置</el-divider>
  <el-form-item class="options-config">
    <template #label>
      <ItemToolBar title="选项列表" @click="onAddItem"/>
    </template>
    <draggable class="options-draggable" :list="valueLocal" item-key="id" handle=".icon-draggable">
      <template #item="{element}">
        <div class="option-item">
          <ElIcon class="icon-draggable">
            <Rank/>
          </ElIcon>
          <div class="option-label">{{ element.label }}</div>
          <el-popover placement="left" :offset="220" :width="250" trigger="click">
            <template #reference>
              <ElIcon>
                <Edit/>
              </ElIcon>
            </template>
            <ElForm :model="element" label-position="left" class="option-edit-form">
              <ElFormItem prop="label" label="选项标题" required>
                <ElInput v-model="element.label"/>
              </ElFormItem>
              <ElFormItem prop="value" label="选项标识" required>
                <ElInput v-model="element.value"/>
              </ElFormItem>
            </ElForm>
          </el-popover>

          <ElPopconfirm title="确定删除吗？" @confirm="onDeleteItem(element.key)">
            <template #reference>
              <ElIcon>
                <Delete/>
              </ElIcon>
            </template>

          </ElPopconfirm>

        </div>
      </template>
    </draggable>
  </el-form-item>

</template>

<style scoped>
.options-draggable {
  width: 100%;
  padding: 0 12px 0 0;
}

.option-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  background: #f5f7fa;
}

.option-item .option-label {
  flex: 0 0 160px;
  width: 160px;
  text-overflow: clip;
}

.icon-draggable {
  cursor: move;
}
</style>
<style>
.option-edit-form .el-form-item__label {
  --el-text-color-regular: rgb(144, 147, 153);
}
</style>
