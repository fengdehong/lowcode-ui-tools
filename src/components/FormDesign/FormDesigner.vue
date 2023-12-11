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
            <draggable
                class="components-draggable"
                :list="designGroup.controllers"
                item-key="_compType"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @start="onStart"
                @end="onEnd"
            >
              <template #item="{element}">
                <div :key="element._compType" class="components-item">
                  <div class="components-body">
                    <ElIcon v-if="element._compIcon.elIcon">
                      <component :is="element._compIcon.elIcon"/>
                    </ElIcon>

                    <i v-else :class="element._compIcon"/>
                    {{ element._compName }}
                  </div>
                </div>
              </template>

            </draggable>
          </div>
        </div>
      </div>
      <LayoutTree :design-group="designGroups"/>
    </div>
    <div class="center-board" @click="designStore.setActiveItem({})">
      <ElForm label-position="top" class="design-form">
        <LayoutSlot class="drawing-board"
                    v-model:list="designStore.list"/>
      </ElForm>
    </div>
    <div class="right-board">
      <config-panel :page-config="designStore.formConfig" :activeItem="designStore.activeItem"
                    :itemList="designStore.list"
                    :components="configPanelComponents"/>
    </div>
  </div>
</template>
<script setup>

import draggable from "vuedraggable";
import {DesignStore} from "./DesignStore";
import configPanel from "./configPanel.vue";
import LayoutTree from "./components/LayoutTree/index.vue";
import LayoutSlot from "./LayoutSlot.vue";

import "./style/designer.css"
import {provide, ref} from "vue";

let tempActiveData;

const props = defineProps({
  designGroups: {required: true},
  designStore: {type: DesignStore, required: true}
});

/**
 *
 * @type {DesignStore}
 */
const designStore = props.designStore;

provide("design-store", designStore);

const configPanelComponents = ref([]);

let controllers = [];
for (let designGroup of props.designGroups) {
  for (let controller of designGroup.controllers) {
    // controller.registry(GlobalContext.app);
    controllers.push(controller);
  }
}

designStore.setControllers(controllers);

function cloneComponent(origin) {
  let newComponent = new origin();
  console.log("new component:", newComponent);
  designStore.setActiveItem(newComponent);
}

function onStart(obj) {

}

function onEnd(obj) {
  console.log("onEnd", obj);
  if (obj.from !== obj.to) {
    designStore.setActiveItem(tempActiveData);
    if (obj.to.className.indexOf('row-drag') < 0) {
      designStore.insertItem(obj.newIndex, tempActiveData);
      console.log("add new item:", tempActiveData);
    }
  } else {
    designStore.setActiveItem({});
  }

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

.center-board .design-form {
  padding: 16px;
  background: #FFFFFF;
  border-radius: 8px;
  height: 100%;
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
  height: calc(100% - 40px);
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
  flex: 0 0 125px;
}

.components-item > .components-body {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: grab;
  background: #f5f7fa;
  padding: 6px 8px;
}

.components-item > .components-body:hover {
  border: 1px dashed var(--el-color-primary);
  color: var(--el-color-primary);
}


.layout-tree {
  height: 150px;
}

</style>
<style>
.components-item > .components-body > .el-icon,
.components-item > .components-body > .iconfont {
  font-size: 18px;
  color: var(--el-disabled-text-color);
}
</style>
