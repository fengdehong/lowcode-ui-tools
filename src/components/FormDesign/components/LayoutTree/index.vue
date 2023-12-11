<template>
  <div class="layout-tree">
    <div class="layout-tree-header">
      图层树
    </div>
    <div class="layout-tree-body">
      <TreeNode v-for="item in DesignStore.list"
                :item="item"
                :controller-map="controllerMap">
      </TreeNode>
    </div>

  </div>
</template>

<script>
import {DesignStore} from "../../DesignStore";
import TreeNode from "./TreeNode.vue";

export default {
  name: "layoutTree",
  components: {TreeNode},
  props: ['designGroup'],
  data() {
    return {
      DesignStore,
      controllerMap: {}
    }
  },
  created() {
    if (this.designGroup) {
      for (let group of this.designGroup) {
        for (let controller of group.controllers) {
          this.controllerMap[controller._compType] = controller;
        }
      }
    }
    console.log("controllerNameMap:", this.controllerMap);
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
