<template>
  <div class="layout-tree">
    <div class="layout-tree-header">
      图层树
    </div>
    <div class="layout-tree-body">
      <TreeNode v-for="item in designStore.list"
                :item="item"
                :controller-map="controllerMap">
      </TreeNode>
    </div>

  </div>
</template>

<script setup>
import {DesignStore} from "../../DesignStore";
import TreeNode from "./TreeNode.vue";
import {useDesignStore} from "../../useDesignStore.js";
import {reactive} from "vue";

const props = defineProps(['designGroup']);

const {designStore} = useDesignStore();
const controllerMap = reactive({});
if (props.designGroup) {
  for (let group of props.designGroup) {
    for (let controller of group.controllers) {
      controllerMap[controller._compType] = controller;
    }
  }
}
</script>

<style scoped>
.layout-tree {
  height: 100%;
  border-top: 1px solid rgb(185, 188, 198);
}

.layout-tree-header {
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
}

.layout-tree-body {
  padding: 8px;
  height: calc(100% - 50px);
  overflow-y: auto;
}

</style>
