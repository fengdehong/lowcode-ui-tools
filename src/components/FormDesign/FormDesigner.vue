<template>
  <div class="container">
    <div class="left-board">
      <!--左侧组件列表-->
      <ComponentListBox :design-groups="designGroups" @componentDragStart="onControllerDragStart"/>
      <LayoutTree :design-group="designGroups"/>
    </div>
    <div class="center-board" @click="designStore.setActiveItem({})">
      <ElForm label-position="top" class="design-form">
        <PageListLayout class="drawing-board"/>
      </ElForm>
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
          <LayoutConfig v-if="designStore.activeItem?.layoutConfig"
                        :layout-config="designStore.activeItem.layoutConfig"/>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>

import {DesignStore} from "./DesignStore";
import LayoutTree from "./components/LayoutTree/index.vue";

import "./style/designer.css"
import {provide} from "vue";
import FormItemConfig from "./form-controllers/components/FormItemConfig.vue";
import LayoutConfig from "@/components/FormDesign/controllers/components/LayoutConfig.vue";
import ComponentListBox from "@/components/FormDesign/components/ComponentListBox/ComponentListBox.vue";
import PageListLayout from "@/components/FormDesign/components/PageListLayout/PageListLayout.vue";

const props = defineProps({
  designGroups: {required: true},
  designStore: {type: Object, required: true}
});

/**
 *
 * @type {DesignStore}
 */
const designStore = props.designStore;

provide("design-store", designStore);


let controllers = [];
for (let designGroup of props.designGroups) {
  for (let controller of designGroup.controllers) {
    // controller.registry(GlobalContext.app);
    controllers.push(controller);
  }
}

designStore.setControllers(controllers);

function onControllerDragStart(component, e) {
  designStore.draggingItem = new component();
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
  padding: 16px;
  border-left: 1px solid var(--el-border-color);
  border-right: 1px solid var(--el-border-color);
  background: #f5f7fa;
}

.center-board .design-form {
  padding: 16px;
  height: 100%;
  background: #FFFFFF;
  overflow-y: auto;
}

.center-board .design-form .drawing-board {
  height: 100%;
  padding-bottom: 16px;
}

.right-board {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
