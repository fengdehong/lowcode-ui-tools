<script setup>
import {reactive, ref} from "vue";

const props = defineProps({
  parentWidth: {type: Number, required: true},
  parentHeight: {type: Number, required: true},
  padding: {type: Number, default: 6},
  id: {type: String, required: true},
  row: {type: Number, required: true},
  column: {type: Number, required: true},
  width: {type: Number, required: true},
  height: {type: Number, required: true},
});

const emits = defineEmits(["update:size", "update:position"]);

/**
 *
 * @type {import("vue").Ref<HTMLDivElement>}
 */
const containerRef = ref(null);
const placeholderSize = reactive({width: 100, height: 300});
const mouseIsDown = ref(false);
const moveDirect = ref(null);

document.addEventListener("mousemove", e => {
  if (mouseIsDown.value) {
    if (moveDirect.value === 'n') {
      placeholderSize.height -= e.movementY;
    } else if (moveDirect.value === 's') {
      placeholderSize.height += e.movementY;
    } else if (moveDirect.value === 'w') {
      placeholderSize.width -= e.movementX;
    } else if (moveDirect.value === 'e') {
      placeholderSize.width += e.movementX;
    } else if (moveDirect.value === 'se') {
      placeholderSize.height += e.movementY;
      placeholderSize.width += e.movementX;
    }
    calcGap();
    e.preventDefault()
  }
})
document.addEventListener("mouseup", e => {
  mouseIsDown.value = false;
  calcPlaceholder();
});

function mouseEnter(e) {
  calcPlaceholder();
}

function calcGap() {
  let width = placeholderSize.width + props.padding * 2;
  let height = placeholderSize.height + props.padding * 2;
  emits("update:size", {
    id: props.id,
    width: Math.round(width / (props.parentWidth / 24)),
    height: Math.round(height / 10),
  })
}

function calcPlaceholder() {
  let rect = containerRef.value.getBoundingClientRect();
  placeholderSize.width = rect.width - props.padding * 2;
  placeholderSize.height = rect.height - props.padding * 2;
  // console.log("current size", rect);
}

function mouseDown(direct, e) {
  calcPlaceholder();
  moveDirect.value = direct;
  mouseIsDown.value = true;
  e.preventDefault();
}

const dragging = ref(false);


let dragStartPosition = {row: undefined, column: undefined, x: undefined, y: undefined};

/**
 *
 * @param e {DragEvent}
 */
function ondragstart(e) {
  // e.preventDefault();
  dragStartPosition = {row: props.row, column: props.column, x: e.x, y: e.y};
  dragging.value = true;
}

/**
 *
 * @param e {DragEvent}
 */
function onDrag(e) {
  e.preventDefault();
  let newColumn = dragStartPosition.column + Math.round((e.x - dragStartPosition.x) / (props.parentWidth / 24));
  let newRow = dragStartPosition.row + Math.round((e.y - dragStartPosition.y) / 10);
  emits("update:position", {row: newRow, column: newColumn, id: props.id})
}

/**
 *
 * @param e {DragEvent}
 */
function onDragend(e) {
  // e.preventDefault();
  dragging.value = false;
}
</script>

<template>
  <div ref="containerRef" class="resizable-div" :class="{resizing:mouseIsDown,dragging:dragging}"
       :style="{gridArea:`${row}/${column}/span ${height}/span ${width}`}"
       @mouseenter="mouseEnter"
       :draggable="true"
       @dragstart="ondragstart"
       @drag="onDrag"
       @dragend="onDragend"
  >
    <div class="inner">
      <div class="resizable-placeholder"
           :style="{width:placeholderSize.width+'px',height:placeholderSize.height+'px'}">
        <div class="placeholder-inner"/>
        {{ `${id}::${row},${column},${width},${height}` }}
        <span class="resizable-handle resizable-handle-s" @mousedown="mouseDown('s',$event)"/>
        <span class="resizable-handle resizable-handle-w" @mousedown="mouseDown('w',$event)"/>
        <span class="resizable-handle resizable-handle-e" @mousedown="mouseDown('e',$event)"/>
        <span class="resizable-handle resizable-handle-n" @mousedown="mouseDown('n',$event)"/>
        <span class="resizable-handle resizable-handle-se" @mousedown="mouseDown('se',$event)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resizable-div {
  padding: 6px;
  transition: all .3s ease;
}

.resizable-div > .inner {
  background: #FFFFFF;
  border-radius: 8px;
  position: relative;
  width: 100%;
  height: 100%;
}

.resizable-div .resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  margin: auto;
  opacity: 0;
}

.resizable-div:hover .resizable-handle {
  opacity: 1;
}

.resizable-div .resizable-handle:after {
  content: " ";
  position: absolute;
  background-color: #878f95;
  border-radius: 2px;
  margin: auto;
}

.resizable-handle.resizable-handle-s {
  left: 0;
  right: 0;
  bottom: -3px;
  width: 60px;
  cursor: ns-resize !important;
}

.resizable-handle.resizable-handle-s:after {
  left: 0;
  right: 0;
  bottom: 6px;
  width: 20px;
  height: 2px;
}

.resizable-handle.resizable-handle-w {
  left: -3px;
  top: 0;
  bottom: 0;
  cursor: ew-resize !important;
  height: 60px;
}


.resizable-handle.resizable-handle-w:after {
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  height: 20px;
}

.resizable-handle.resizable-handle-e {
  top: 0;
  bottom: 0;
  right: -3px;
  cursor: ew-resize !important;
  height: 60px;
}

.resizable-handle.resizable-handle-e:after {
  top: 0;
  bottom: 0;
  right: 6px;
  width: 2px;
  height: 20px;
}

.resizable-handle.resizable-handle-n {
  top: -3px;
  left: 0;
  right: 0;
  cursor: ns-resize !important;
  width: 60px;
}

.resizable-handle.resizable-handle-n:after {
  top: 6px;
  left: 0;
  right: 0;
  width: 20px;
  height: 2px;

}

.resizable-handle.resizable-handle-se {

}


.resizable-div.resizing {
  will-change: width, height;
}

.resizable-div.dragging {
  background: rgba(128, 0, 0, 0.1);
  border-radius: 8px;
}


.resizable-div .resizable-placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 0, 0, 0);
  border-radius: 8px;
}

.resizable-div:hover .resizable-placeholder {

}

.resizable-div.resizing .resizable-placeholder {
  background: rgba(128, 0, 0, 0.1);
}

</style>
<style>
.resizable-div.sortable-ghost > .inner {
  background: rgba(128, 0, 0, .1);
}
</style>
