<template>
  <div class="tree-node" :class="{'is-active':item===DesignStore.activeItem,'is-hover':item===DesignStore.hoverItem}"
       @click.stop="DesignStore.setActiveItem(item)"
       @mouseenter.stop="DesignStore.setHoverItem(item)"
       @mouseleave.stop="DesignStore.setHoverItem({})">
    <div class="tree-node__label">
      <i :class="'iconfont '+controllerMap[item.compType]._compIcon"/>{{ controllerMap[item.compType]._compName }}
    </div>
    <div class="tree-node__sub-items">
      <template v-if="item.customConfig.columns" v-for="column in item.customConfig.columns">
        <TreeNode v-for="subItem in column.list" :key="subItem.id" :item="subItem"
                  :controller-map="controllerMap"/>
      </template>
    </div>
  </div>
</template>

<script>
import {DesignStore} from "../../DesignStore";

export default {
  name: "TreeNode",
  computed: {
    DesignStore() {
      return DesignStore
    }
  },
  props: ['item', 'controllerMap'],
}
</script>

<style scoped>
.tree-node > .tree-node__label {
  cursor: pointer;
  padding: 0 10px;
  line-height: 24px;
  font-size: 12px;
}

.tree-node.is-active > .tree-node__label {
  background-color: #f5f7fa;
  color: #409eff;
}

.tree-node > .tree-node__label:hover,
.tree-node.is-hover > .tree-node__label {
  color: #409eff;
}

.tree-node__label > .iconfont {
  margin-right: 4px
}

.tree-node > .tree-node__sub-items {
  padding-left: 10px;
}

</style>
