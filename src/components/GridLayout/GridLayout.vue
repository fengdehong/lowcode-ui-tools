<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import GridItem from "@/components/GridLayout/GridItem.vue";
import {compact} from "./utils.js";

const props = defineProps({
  layout: {type: Array, required: true}
});

const emits = defineEmits(["update:layout", "onDrop"]);

const parentWidth = ref(window.innerWidth);
const parentHeight = ref(window.innerHeight);

const parentContainerRef = ref(null);
onMounted(() => {
  parentWidth.value = parentContainerRef.value.getBoundingClientRect().width;
  parentHeight.value = parentContainerRef.value.getBoundingClientRect().height;
  let newArrayDetect = compact(props.layout);
  emits("update:layout", newArrayDetect);
  const resizeObserver = new ResizeObserver((target) => {
    parentWidth.value = parentContainerRef.value.getBoundingClientRect().width;
    parentHeight.value = parentContainerRef.value.getBoundingClientRect().height;
  });
  resizeObserver.observe(parentContainerRef.value);
  onUnmounted(() => resizeObserver.disconnect());
})

/**
 *
 * @param e {{width:Number,height:Number,id:String}}
 */
function onSizeUpdate(e) {
  let index = props.layout.findIndex(l => l.id === e.id);
  if (index >= 0) {
    let newArray = [...props.layout]
    newArray[index] = Object.assign({}, newArray[index], e);
    let newArrayDetect = compact(newArray);
    emits("update:layout", newArrayDetect);
  }
}

/**
 *
 * @param e {{row:Number,column:Number,id:String}}
 */
function onPositionUpdate(e) {
  let index = props.layout.findIndex(l => l.id === e.id);
  if (index >= 0) {
    let newArray = [...props.layout]
    newArray[index] = Object.assign({}, newArray[index], e);
    let newArrayDetect = compact(newArray);
    emits("update:layout", newArrayDetect);
  }
}

let dragEnterCounter = 0;
let droppingItem = ref(null);

function removeDroppingPlaceholder() {
  const index = props.layout.findIndex(l => l.id === "dragging-item");
  droppingItem.value = null;
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
  // console.log("dragover:", e);
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  const gridRect = e.currentTarget.getBoundingClientRect(); // The grid's position in the viewport
  // Calculate the mouse position relative to the grid
  const layerX = e.clientX - gridRect.left;
  const layerY = e.clientY - gridRect.top;
  let newColumn = Math.round(layerX / (gridRect.width / 24));
  let newRow = Math.round(layerY / 10);
  // emits("update:position", {row: newRow, column: newColumn, id: props.id})

  if (!droppingItem.value) {
    console.log("dataTransfer:", e.dataTransfer);
    droppingItem.value = {
      id: "dragging-item",
      row: newRow,
      column: newColumn,
      width: 12,
      height: 30
    };
    const newLayout = [...props.layout, droppingItem.value];
    emits("update:layout", newLayout);
  } else {
    onPositionUpdate({row: newRow, column: newColumn, id: "dragging-item"})
  }

}

function onItemDragStart(id) {
  droppingItem.value = props.layout.find(l => l.id === id);
}

function onItemDragEnd(id) {
  droppingItem.value = undefined;
}
</script>

<template>
  <div class="resizable-container" ref="parentContainerRef"
       @drop="onDrop"
       @dragleave="onDragleave"
       @dragenter="onDragenter"
       @dragover="onDragover"
  >
    <GridItem class="drag-item" v-for="item in layout" :key="item.id"
              :parent-width="parentWidth"
              :parent-height="parentHeight"
              :id="item.id"
              :row="item.row"
              :column="item.column"
              :width="item.width"
              :height="item.height"
              @update:size="onSizeUpdate"
              @update:position="onPositionUpdate"
              @itemDragStart="onItemDragStart"
              @itemDragEnd="onItemDragEnd"
    >
      <slot v-bind:item="item"/>
    </GridItem>
  </div>
</template>

<style scoped>
.resizable-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: 10px;
}
</style>
