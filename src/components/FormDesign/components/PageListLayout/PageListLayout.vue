<script setup>

import DesignItemAuto from "@/components/FormDesign/designItemAuto.vue";
import {useDesignStore} from "@/components/FormDesign/useDesignStore.js";
import DroppableListLayout from "@/components/DroppableListLayout/DroppableListLayout.vue";

const {designStore} = useDesignStore();


/**
 *
 * @param layout {LayoutItem[]}
 * @param index {Number}
 * @param e {DragEvent}
 */
function onLayoutDrop(layout, index, e) {
  if (!designStore.draggingItem) return;
  console.log("onLayoutDrop", layout, index, designStore.draggingItem);

  designStore.list.push(designStore.draggingItem);
  designStore.setActiveItem(designStore.draggingItem);
  designStore.draggingItem = null;
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

}

/**
 *
 * @param item {BaseController}
 */
function onDelete(item) {
  let index = designStore.list.findIndex(old => old.id === item.id);
  designStore.list.splice(index, 1);
  designStore.setActiveItem({});
}


</script>

<template>
  <DroppableListLayout class="main-layout" v-model:list="designStore.list" @onDrop="onLayoutDrop">
    <template #default="{item}">
      <DesignItemAuto :form="{}" :model="item" v-model:list="designStore.list"
                      @copy="onCopy" @delete="onDelete"/>
    </template>
  </DroppableListLayout>
</template>

<style scoped>

</style>
