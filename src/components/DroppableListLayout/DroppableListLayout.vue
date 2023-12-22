<script setup>

import {defineEmits, defineProps, reactive, ref, watch} from "vue";

const props = defineProps({list: {type: Array, required: true}});
const emits = defineEmits(["update:list", "onDrop"]);
const listTemp = ref([...props.list]);
watch(props.list, () => {
  console.log("list change:", props.list);
  listTemp.value = [...props.list];
});

let dragEnterCounter = 0;
let droppingItem = ref(null);
let droppingOffset = reactive({x: 0, y: 0});

function removeDroppingPlaceholder() {
  const index = listTemp.value.findIndex(l => l.id === "dragging-item");
  if (index >= 0) {
    listTemp.value.splice(index, 1);
  }
}


/**
 *
 * @param e {DragEvent}
 */
function onDrop(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  const index = listTemp.value.indexOf(l => l.id === droppingItem.value.id);
  dragEnterCounter = 0;
  removeDroppingPlaceholder();
  droppingItem.value = null;
  emits("onDrop", listTemp.value, index, e);
}


/**
 *
 * @param e {DragEvent}
 */
function onDragleave(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  dragEnterCounter--;
  if (dragEnterCounter === 0) {
    removeDroppingPlaceholder();
  }
}

/**
 *
 * @param e {DragEvent}
 */
function onDragenter(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  dragEnterCounter++;
}


/**
 *
 * @param e {DragEvent}
 */
function onDragover(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  if (!droppingItem.value) {
    Object.assign(droppingOffset, {x: 0, y: 0});
    droppingItem.value = {
      id: "dragging-item",
    };
    listTemp.value = [...props.list, droppingItem.value];
  }
}

/**
 * @param item {{id:String}}
 * @param e {DragEvent}
 */
function onItemDragOver(item, e) {
  if (!droppingItem.value) return;
  if (item.id === droppingItem.value.id) return;
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  /**
   * @type {DOMRect}
   */
  const rect = e.currentTarget.getBoundingClientRect();
  const itemIndex = listTemp.value.findIndex(l => l.id === item.id);
  const droppingIndex = listTemp.value.findIndex(l => l.id === droppingItem.value.id);

  if (e.clientY < (rect.top + rect.height / 2)) {
    if (droppingIndex === itemIndex - 1) return;
    const listCopy = [...listTemp.value];
    listCopy.splice(droppingIndex, 1);
    listCopy.splice(itemIndex, 0, droppingItem.value);
    listTemp.value = listCopy;
  } else if (e.clientY > (rect.bottom - rect.height / 2)) {
    if (droppingIndex === itemIndex + 1) return;
    const listCopy = [...listTemp.value];
    listCopy.splice(droppingIndex, 1);
    listCopy.splice(itemIndex, 0, droppingItem.value);
    listTemp.value = listCopy;
  }
}

function onItemDragStart(item, e) {
  droppingItem.value = item;
}
</script>

<template>
  <div class="layout-container" ref="parentContainerRef"
       @drop="onDrop"
       @dragleave="onDragleave"
       @dragenter="onDragenter"
       @dragover="onDragover"
  >
    <div v-if="listTemp.length" v-for="item in listTemp" :key="item.id"
         class="item-wrap" :class="{dragging:droppingItem?.id===item.id}"
         draggable="true"
         @dragstart="onItemDragStart(item,$event)"
         @dragover="onItemDragOver(item,$event)">
      <div v-if="item.id==='dragging-item'" class="dragging-handle"></div>
      <slot v-else :item="item"/>
    </div>
    <div v-else class="placeholder">
      拖拽组件到当前位置
    </div>
  </div>
</template>

<style scoped>

</style>
<style>
.layout-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.placeholder {
  box-sizing: border-box;
  position: absolute;
  color: #5e6d82;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px dashed #8c939d;
}

.dragging-handle {
  height: 100px;
  width: 100%;
  background: #8c939d;
}

.item-wrap.dragging {
  opacity: .3;
  background: #8c939d;
}
</style>
