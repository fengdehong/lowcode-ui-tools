<script setup>

import {defineEmits, defineProps, reactive, ref} from "vue";

const props = defineProps({list: {type: Array, required: true}});
const emits = defineEmits(["update:list"]);

let dragEnterCounter = 0;
let droppingItem = ref(null);
let droppingOffset = reactive({x: 0, y: 0});

function removeDroppingPlaceholder() {
  const index = props.list.findIndex(l => l.id === "dragging-item");
  if (index >= 0) {
    const newLayout = [...props.list];
    newLayout.splice(index, 1);
    emits("update:layout", newLayout);
  }
}


/**
 *
 * @param e {DragEvent}
 */
function onDrop(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  const {layout} = props;
  const item = layout.find(l => l.id === droppingItem.value.id);
  dragEnterCounter = 0;
  removeDroppingPlaceholder();
  droppingItem.value = null;
  emits("onDrop", layout, item, e);
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
      row: 1,
      column: 1,
      width: 12,
      height: 30
    };
    const newLayout = [...props.layout, droppingItem.value];
    emits("update:layout", newLayout);
  } else {
    // onPositionUpdate(e)
  }

}
</script>

<template>
  <div class="layout-container" ref="parentContainerRef"
       @drop="onDrop"
       @dragleave="onDragleave"
       @dragenter="onDragenter"
       @dragover="onDragover"
  >
    <div class="item-wrap" v-for="item in list" :key="item.id" draggable="true"
         @dragstart="onItemDragStart(item.id,$event)"></div>
  </div>
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
//height: 100%; border: 1px dashed #337dff; text-align: center; vertical-align: center;
}
</style>
