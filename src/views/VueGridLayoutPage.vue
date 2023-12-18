<script setup>
import {ref} from "vue";
import {nanoid} from "nanoid";

const colNum = 24;
const layout = ref([
  {"x": 0, "y": 0, "w": 2, "h": 2, "i": "0"},
  {"x": 2, "y": 0, "w": 2, "h": 4, "i": "1"},
  {"x": 4, "y": 0, "w": 2, "h": 5, "i": "2"},
  {"x": 6, "y": 0, "w": 2, "h": 3, "i": "3"},
  {"x": 8, "y": 0, "w": 2, "h": 3, "i": "4"},
  {"x": 10, "y": 0, "w": 2, "h": 3, "i": "5"},
  {"x": 0, "y": 5, "w": 2, "h": 5, "i": "6"},
])
const gridlayoutRef = ref(null);
const gridItemsRef = ref(null);
const mouseXY = {"x": null, "y": null};
const DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};


function drag(e) {
  mouseXY.x = e.clientX;
  mouseXY.y = e.clientY;
  // console.log("drag", e);
  let parentRect = gridlayoutRef.value.$el.getBoundingClientRect();
  let mouseInGrid = false;
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    mouseInGrid = true;
  }
  if (mouseInGrid === true && (layout.value.findIndex(item => item.i === 'drop')) === -1) {
    layout.value.push({
      x: (layout.value.length * 2) % colNum,
      y: layout.value.length + colNum, // puts it at the bottom
      w: 1,
      h: 1,
      i: 'drop',
    });
  }
  let index = layout.value.findIndex(item => item.i === 'drop');
  if (index !== -1) {
    try {
      gridItemsRef.value[layout.value.length].$refs.item.style.display = "none";
    } catch {
    }

    let el = gridItemsRef.value[index];
    if (!el) return;
    el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
    let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

    if (mouseInGrid === true) {
      gridlayoutRef.value.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
      DragPos.i = String(index);
      DragPos.x = layout.value[index].x;
      DragPos.y = layout.value[index].y;
    }
    if (mouseInGrid === false) {
      gridlayoutRef.value.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
      layout.value = layout.value.filter(obj => obj.i !== 'drop');
    }
  }
}

function dragend(e) {
  mouseXY.x = e.clientX;
  mouseXY.y = e.clientY;
  let parentRect = gridlayoutRef.value.$el.getBoundingClientRect();
  let mouseInGrid = false;
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    mouseInGrid = true;
  }
  if (mouseInGrid === true) {
    gridlayoutRef.value.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
    layout.value.push({
      x: DragPos.x,
      y: DragPos.y,
      w: 1,
      h: 1,
      i: DragPos.i,
    });
    gridlayoutRef.value.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
    try {
      gridlayoutRef.value[layout.value.length].$refs.item.style.display = "block";
    } catch {
    }
  }
}

let draggingItem = undefined;

function dragenter(e) {
  if (!draggingItem) {
    console.log("enter:", e);
    draggingItem = {
      x: (layout.value.length * 2) % colNum,
      y: layout.value.length + colNum, // puts it at the bottom
      w: 1,
      h: 1,
      i: nanoid(),
    };
    layout.value.push(draggingItem);
    return;
  }
  mouseXY.x = e.clientX;
  mouseXY.y = e.clientY;
  if (!draggingItem) return;
  let index = layout.value.indexOf(draggingItem);

  let parentRect = gridlayoutRef.value.$el.getBoundingClientRect();

  let el = gridItemsRef.value[index];
  if (!el) return;
  console.log("dragover", el);
  el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
  let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

  // console.log("dragover:", e);
  gridlayoutRef.value.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
  DragPos.i = String(index);
  DragPos.x = layout.value[index].x;
  DragPos.y = layout.value[index].y;
}

function dragover(e) {


}

function dragleave(e) {
  if (!draggingItem) return;
  let index = layout.value.indexOf(draggingItem);
  layout.value.splice(index, 1);
  draggingItem = null;
}
</script>

<template>
  <div class="container-wrap">
    <div @dragend="dragend" class="droppable-element" draggable="true">Droppable Element (Drag me!)
    </div>
    {{ layout }}
    <grid-layout
        v-model:layout="layout"
        ref="gridlayoutRef"
        @dragenter="dragenter"
        @dragover="dragover"
        @dragleave="dragleave"
        :col-num="colNum" :row-height="30"
        :is-draggable="true" :is-resizable="true"
        :is-mirrored="false" :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true">
      <grid-item v-for="item in layout" ref="gridItemsRef" :key="item.i"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <div class="item-div">
          {{ item.i }}
        </div>
      </grid-item>
    </grid-layout>
  </div>

</template>

<style scoped>
.item-div {
  height: 100%;
  width: 100%;
  background: #8c939d;
}

.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
</style>
