<template>
  <div class="drawing-item"
       :class="{'active-from-item':designStore.activeItem === model,'is-hover':designStore.hoverItem===model}"
       @click.stop="designStore.setActiveItem(model)"
       @mouseenter.stop="designStore.setHoverItem(model)"
       @mouseleave.stop="designStore.setHoverItem({})">
    <Component :is="model.compType" :model="model" :form="form"/>
    <div class="drawing-item-controller">
      <ElLink title="复制" icon="DocumentCopy" type="primary" @click.stop="onCopy"/>
      <ElLink title="删除" icon="Delete" type="danger" @click.stop="onDelete"/>
    </div>
  </div>
</template>

<script setup>
import {useDesignStore} from "./useDesignStore";

const props = defineProps({
  list: {type: Array, required: true},
  model: {type: Object, required: true},
  form: {type: Object, required: true},
});

const emits = defineEmits(["update:list", "copy", "delete"]);
const {designStore} = useDesignStore();

function onCopy() {
  emits("copy", props.model);
}


function onDelete() {
  emits("delete", props.model);
}

</script>

<style scoped>
.drawing-item {
  width: 100%;
  height: 100%;
  --selectedColor: #e6f2ff;
  --selectedBorderColor: var(--el-color-primary);
  --lighterBlue: #409EFF;
}


.drawing-item {
  margin: 2px;
  position: relative;
  border: none;

  &.unfocus-bordered:not(.active-from-item) > div:first-child {
    border: 1px dashed #ccc;
  }

  .el-form-item {
    padding: 12px 10px;
  }
}

.drawing-item {
  .drawing-item-controller {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    text-align: center;
    font-size: 14px;
    z-index: 1;
    padding: 4px 2px;
    border-radius: 16px;
    background: rgba(247, 247, 247, 0.7);
  }

  .drawing-item-controller > * {
    padding: 0 6px;
    line-height: 14px;
  //cursor: pointer;
  }

  .drawing-item-controller > * + * {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  & > .drawing-item-copy {
    right: 56px;
    border-color: var(--lighterBlue);
    color: var(--lighterBlue);
    background: #fff;

    &:hover {
      background: var(--lighterBlue);
      color: #fff;
    }
  }

  & > .drawing-item-delete {
    right: 24px;
    border-color: #F56C6C;
    color: #F56C6C;
    background: #fff;

    &:hover {
      background: #F56C6C;
      color: #fff;
    }
  }
}

.drawing-item.sortable-ghost {
  width: 100%;
  height: 5px;
  background-color: var(--selectedColor);
}

.drawing-item.active-from-item:hover,
.drawing-item.active-from-item.is-hover,
.drawing-item.active-from-item {
  outline: 2px solid var(--selectedBorderColor);
}

.drawing-item:hover,
.drawing-item.is-hover {
  outline: 1px dashed var(--selectedBorderColor);
}

.active-from-item {
  & > .el-form-item {
    background: var(--selectedColor);
    border-radius: 6px;
  }

  & > .drawing-item-controller {
    display: flex;

  }

  & > .component-name {
    color: var(--lighterBlue);
  }
}


.drawing-item[draggable='true']:after {
  display: block;
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(64, 158, 255, .1);
}

</style>
<style>
.editing-component * {
//pointer-events: none;
}
</style>
