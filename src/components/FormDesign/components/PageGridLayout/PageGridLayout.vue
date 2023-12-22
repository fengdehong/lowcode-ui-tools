<script setup>

import DesignItemAuto from "@/components/FormDesign/designItemAuto.vue";
import GridLayout from "@/components/GridLayout/GridLayout.vue";
import {useDesignStore} from "@/components/FormDesign/useDesignStore.js";
import {compact} from "@/components/GridLayout/utils.js";

const {designStore} = useDesignStore();


/**
 *
 * @param layout {LayoutItem[]}
 * @param item {LayoutItem}
 * @param e {DragEvent}
 */
function onLayoutDrop(layout, item, e) {
  const tempActiveData = designStore.draggingItem;
  if (!tempActiveData) return;
  item = Object.assign({}, item, {id: tempActiveData.id})
  designStore.list.push(tempActiveData);
  designStore.setActiveItem(tempActiveData);
  designStore.draggingItem = null;

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


function findRenderItem(id) {
  return designStore.list.find(item => item.id === id);
}

</script>

<template>
  <GridLayout class="main-layout" v-model:layout="designStore.gridLayout" @onDrop="onLayoutDrop">
    <template #default="{item}">
      <DesignItemAuto v-if="findRenderItem(item.id)" :form="{}" :model="findRenderItem(item.id)"
                      v-model:list="designStore.list"
                      @copy="onCopy" @delete="onDelete"/>
    </template>
  </GridLayout>
</template>

<style scoped>

</style>
