<script setup>

import {onMounted, ref} from "vue";
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
let droppingItem = ref(undefined);

function removeDroppingPlaceholder() {

}


/**
 *
 * @param e {DragEvent}
 */
function onDrop(e) {
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
  const {layout} = props;
  const item = layout.find(l => l.i === droppingItem.i);
  // reset dragEnter counter on drop
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
  e.preventDefault(); // Prevent any browser native action
  e.stopPropagation();
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
    />
  </div>
</template>

<style scoped>
.resizable-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(24, 1fr);
}
</style>
