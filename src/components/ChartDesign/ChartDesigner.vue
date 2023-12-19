<template>
  <div class="container">
    <div class="left-board">
      <!--左侧组件列表-->
      <div class="components-list">
        <div class="components-list-header">
          控件列表
        </div>
        <div class="components-list-content">
          <div v-for="designGroup in designGroups" :key="designGroup.group">
            <div class="components-title">
              {{ designGroup.group }}
            </div>
            <div class="components-draggable">
              <div v-for="element in designGroup.controllers" :key="element._compType" class="components-item"
                   draggable="true" @dragstart="onControllerDragStart(element,$event)">
                <div class="components-body">
                  <ElIcon v-if="element._compIcon.elIcon">
                    <component :is="element._compIcon.elIcon"/>
                  </ElIcon>
                  <div v-else-if="element._compIcon.chartIcon" class="chart-icon"
                       :class="{[element._compIcon.chartIcon]:true}"/>
                  <i v-else :class="element._compIcon"/>
                  {{ element._compName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LayoutTree :design-group="designGroups"/>
    </div>
    <div class="center-board" @click="designStore.setActiveItem({})">
      <GridLayout class="main-layout" v-model:layout="designStore.gridLayout"
                  @onDrop="onLayoutDrop">
        <template #default="{item}">
          <DesignItemAuto v-if="findRenderItem(item.id)" :form="{}" :model="findRenderItem(item.id)"
                          v-model:list="designStore.list"
                          @copy="onCopy" @delete="onDelete"/>
        </template>
      </GridLayout>
    </div>
    <div class="right-board">
      <div class="config-panel">
        <div class="title">属性配置</div>
        <el-form size="small" label-position="top" class="config-form">
          <FormItemConfig v-if="designStore.activeItem?.formItemConfig"
                          :config="designStore.activeItem.formItemConfig"/>
          <component v-if="designStore.activeItem?.compType"
                     v-model:customConfig="designStore.activeItem.customConfig"
                     :is="designStore.activeItem.compType+'ConfigPanel'"/>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>

import {ChartDesignStore} from "./ChartDesignStore";
import LayoutTree from "../FormDesign/components/LayoutTree/index.vue";

import "./style/designer.css"
import {provide, reactive} from "vue";
import FormItemConfig from "../FormDesign/form-controllers/components/FormItemConfig.vue";
import GridLayout from "@/components/GridLayout/GridLayout.vue";
import DesignItemAuto from "@/components/FormDesign/designItemAuto.vue";
import {compact} from "@/components/GridLayout/utils.js";

let tempActiveData;

const props = defineProps({
  designGroups: {required: true},
});

/**
 *
 * @type {ChartDesignStore}
 */
const designStore = reactive(new ChartDesignStore());

provide("design-store", designStore);


let controllers = [];
for (let designGroup of props.designGroups) {
  for (let controller of designGroup.controllers) {
    // controller.registry(GlobalContext.app);
    controllers.push(controller);
  }
}

designStore.setControllers(controllers);

function findRenderItem(id) {
  return designStore.list.find(item => item.id === id);
}

/**
 *
 * @param origin {Function}
 * @param e {DragEvent}
 */
function onControllerDragStart(origin, e) {
  tempActiveData = new origin();
}

/**
 *
 * @param layout {LayoutItem[]}
 * @param item {LayoutItem}
 * @param e {DragEvent}
 */
function onLayoutDrop(layout, item, e) {
  if (!tempActiveData) return;
  item = Object.assign({}, item, {id: tempActiveData.id})
  designStore.list.push(tempActiveData);
  designStore.setActiveItem(tempActiveData);
  tempActiveData = null;

  let newLayout = [...designStore.gridLayout];
  newLayout.push(item);
  designStore.gridLayout = compact(newLayout);

}


/**
 *
 * @param item {BaseController}
 */
function onCopy(item) {
  const clone = item.clone();

  let oldIndex = designStore.list.findIndex(old => old.id === item.id);
  if (oldIndex < 0) throw new Error("当前对象不存在:" + item.id);
  designStore.list.splice(oldIndex + 1, 0, clone);
  designStore.setActiveItem(clone);

  oldIndex = designStore.gridLayout.findIndex(old => old.id === item.id);
  if (oldIndex < 0) throw new Error("当前对象布局信息不存在:" + item.id);
  const oldLayoutItem = designStore.gridLayout[oldIndex];
  const newLayoutItem = Object.assign({}, oldLayoutItem, {id: clone.id});
  if (oldLayoutItem.column + (oldLayoutItem.width - 1) * 2 <= 24) {
    newLayoutItem.column = oldLayoutItem.column + oldLayoutItem.width;
  }
  console.log("onCopy:", oldLayoutItem, newLayoutItem);
  let newLayout = [...designStore.gridLayout];
  newLayout.splice(oldIndex + 1, 0, newLayoutItem);
  designStore.gridLayout = compact(newLayout);
}

/**
 *
 * @param item {BaseController}
 */
function onDelete(item) {
  let index = designStore.list.findIndex(old => old.id === item.id);
  designStore.list.splice(index, 1);
  designStore.setActiveItem({});

  index = designStore.gridLayout.findIndex(old => old.id === item.id);


  let newLayout = [...designStore.gridLayout];
  newLayout.splice(index, 1);
  designStore.gridLayout = compact(newLayout);
}


</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.left-board {
  flex: 0 0 280px;
  height: calc(100% - 8px);
}

.drawing-board {
  height: 100%;
}

.center-board {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 32px);
  overflow-y: auto;
  padding: 16px;
  border-left: 1px solid var(--el-border-color);
  border-right: 1px solid var(--el-border-color);
  background: #f5f7fa;
}

.center-board .main-layout {
  height: 100%;
}

.center-board .design-form .drawing-board {
  padding: 16px;
  background: #FFFFFF;
  border-radius: 8px;
  height: calc(100% - 32px);
  overflow-y: auto;
}

.right-board {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.components-list {
  height: calc(100% - 150px);
}

.components-list-header {
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
}


.components-list-content {
  padding: 8px;
  height: calc(100% - 66px);
  overflow-y: auto;

  .components-title {
    color: #222;
    margin: 6px 6px;
    font-weight: bold;
    font-size: 12px;
    color: rgba(17, 31, 44, 0.6);
  }
}

.components-draggable {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.components-item {
  flex: 0 0 81px;
}

.components-item > .components-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: grab;
  background: #f5f7fa;
  padding: 8px;
}

.components-item > .components-body:hover {
  border: 1px dashed var(--el-color-primary);
  color: var(--el-color-primary);
}


.layout-tree {
  height: 150px;
}


.config-panel {
  height: 100%;
}

.config-panel .title {
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
}

.config-panel .config-form {
  padding: 16px;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>

<style>
.config-panel > .el-form,
.config-panel > .el-form > .el-tabs {
  height: 100%;
}

.config-panel > .el-form > .el-tabs {
  display: flex;
  flex-direction: column;
}

.config-panel > .el-form > .el-tabs > .el-tabs__header {
  flex: 1 1 40px;
  margin-bottom: 0;
}

.config-panel > .el-form > .el-tabs > .el-tabs__header .el-tabs__item {
  padding: 4px 8px 4px 16px;
}

.config-panel > .el-form > .el-tabs > .el-tabs__content {
  flex: 1 1 100%;
  padding: 16px;
  overflow-y: auto;
}

.config-panel .el-form-item__label {
  font-weight: bold;
  --el-text-color-regular: rgb(144, 147, 153);
  padding: 0;
}

.components-item > .components-body > .el-icon,
.components-item > .components-body > .iconfont {
  font-size: 14px;
  color: var(--el-disabled-text-color);
}
</style>
