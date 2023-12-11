<script setup>
import {computed} from 'vue'
import draggable from "vuedraggable";
import DesignItemAuto from "./designItemAuto.vue";
import {useDesignStore} from "./useDesignStore.js";

const {designStore} = useDesignStore();

const props = defineProps({
  list: {type: Array, required: true},
  itemClass: {type: String}
});
const emits = defineEmits(["update:list"]);

const listAdaptor = computed({
  get() {
    return props.list;
  },
  set(val) {
    emits("update:list", val);
  }
})

function handleStart(e) {
  console.log("start:", e);
}

function handleMove(e) {
  console.log("handleMove:", e);
}

function handlerAdd(evt) {
  if (evt.pullMode === 'clone') {
    let list = [...props.list];
    list.splice(evt.newIndex, 0, designStore.activeItem);
    emits("update:list", list);
  }
}

</script>

<template>
  <draggable class="drag-wrapper row-drag" :class="{'is-null':listAdaptor.length===0}"
             v-model="listAdaptor" item-key="id" :animation="100"
             handle=".item-draggable-handle"
             :group="{ name: 'componentsGroup', pull: true, put: true }"
             @start="handleStart"
             @onMove="handleMove"
             @add="handlerAdd">
    <template #header>
      <el-empty class="draggable-empty" v-if="listAdaptor.length===0" description="请拖入控件"/>
    </template>
    <template #item="{element}">
      <DesignItemAuto v-model:list="listAdaptor" :model="element"/>
    </template>

  </draggable>
</template>

<style scoped>

</style>
<style>
.drag-wrapper {
  position: relative;
  //height: 100%;
}

.drag-wrapper > .draggable-empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  //height: 100%;
}

.drag-wrapper.is-null > .sortable-ghost {
  width: 100%;
  //height: 100%;
  border: 1px dashed #337dff;
  text-align: center;
  vertical-align: center;
}
</style>
