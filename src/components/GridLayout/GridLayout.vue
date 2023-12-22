<script setup>

import {onMounted, onUnmounted, reactive, ref} from "vue";
import GridItem from "@/components/GridLayout/GridItem.vue";
import {compact} from "./utils.js";

const props = defineProps({
  layout: {type: Array, required: true}
});

const emits = defineEmits(["update:layout", "onDrop"]);
const layoutSize = reactive({width: window.innerWidth, height: window.innerHeight});


const parentContainerRef = ref(null);
emits("update:layout", compact(props.layout));
onMounted(() => {
  updateContainerSize()
  const resizeObserver = new ResizeObserver(updateContainerSize);
  resizeObserver.observe(parentContainerRef.value);
  onUnmounted(() => resizeObserver.disconnect());
})

function updateContainerSize() {
  layoutSize.width = parentContainerRef.value.getBoundingClientRect().width;
  layoutSize.height = parentContainerRef.value.getBoundingClientRect().height;
}


let dragEnterCounter = 0;
let droppingItem = ref(null);
let droppingOffset = reactive({x: 0, y: 0});

function removeDroppingPlaceholder() {
  const index = props.layout.findIndex(l => l.id === "dragging-item");
  if (index >= 0) {
    const newLayout = [...props.layout];
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
    onPositionUpdate(e)
  }

}

/**
 *
 * @param id {String}
 * @param e {DragEvent}
 */
function onItemDragStart(id, e) {
  const itemRect = e.currentTarget.getBoundingClientRect()
  droppingItem.value = props.layout.find(l => l.id === id);
  Object.assign(droppingOffset, {x: e.clientX - itemRect.left, y: e.clientY - itemRect.top});
}


/**
 *
 * @param e {DragEvent}
 */
function onPositionUpdate(e) {
  if (!droppingItem.value) return;
  const gridRect = parentContainerRef.value.getBoundingClientRect(); // The grid's position in the viewport
  const layerX = e.clientX - droppingOffset.x - gridRect.left;
  const layerY = e.clientY - droppingOffset.y - gridRect.top;
  let newColumn = Math.round(layerX / (gridRect.width / 24));
  let newRow = Math.round(layerY / 10);
  updateItem(droppingItem.value.id, {row: newRow, column: newColumn});
}

/**
 *
 * @param id {String}
 * @param newInfo {{row?:Number,column?:Number,width?:Number,height?:Number}}
 */
function updateItem(id, newInfo) {
  let index = props.layout.findIndex(l => l.id === id);
  if (index >= 0) {
    let newArray = [...props.layout]
    newArray[index] = Object.assign(newArray[index], newInfo);
    emits("update:layout", compact(newArray));
  }
}
</script>

<template>
  <div class="resizable-container" ref="parentContainerRef"
       @drop="onDrop"
       @dragleave="onDragleave"
       @dragenter="onDragenter"
       @dragover="onDragover"
  >
    <GridItem v-if="layout.length" class="drag-item" :class="{dragging:droppingItem?.id===item.id}"
              v-for="item in layout" :key="item.id"
              :grid-width="layoutSize.width/24"
              :id="item.id"
              :row="item.row"
              :column="item.column"
              :width="item.width"
              :height="item.height"
              @update:size="updateItem(item.id,$event)"
              draggable="true"
              @dragstart="onItemDragStart(item.id,$event)"
    >
      <slot v-bind:item="item"/>
    </GridItem>
    <div v-else class="placeholder">
      拖拽组件到当前位置
    </div>
  </div>
</template>

<style scoped>
.resizable-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: 10px;
  position: relative;
}

.drag-item.dragging {
  background: rgba(128, 0, 0, 0.1);
  border-radius: 8px;
}

.placeholder {
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
</style>
