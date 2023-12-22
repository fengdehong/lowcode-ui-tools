<script setup>
defineProps({
  designGroups: {type: Array, required: true}
})

const emits = defineEmits(["componentDragStart"])

/**
 *
 * @param component {BaseController}
 * @param e {DragEvent}
 */
function onControllerDragStart(component, e) {
  emits("componentDragStart", component, e);
}
</script>

<template>
  <div class="components-list">
    <div class="components-list-header">
      控件列表
    </div>
    <div class="components-list-content">
      <div v-for="designGroup in designGroups" :key="designGroup.group">
        <div class="components-title">
          {{ designGroup.group }}
        </div>
        <div class="components-draggable">
          <div v-for="element in designGroup.controllers" :key="element._compType" class="components-item"
               draggable="true" @dragstart="onControllerDragStart(element,$event)">
            <div class="components-body">
              <ElIcon v-if="element._compIcon.elIcon">
                <component :is="element._compIcon.elIcon"/>
              </ElIcon>
              <div v-else-if="element._compIcon.chartIcon" class="chart-icon"
                   :class="{[element._compIcon.chartIcon]:true}"/>
              <i v-else :class="element._compIcon"/>
              {{ element._compName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.components-list {
  height: calc(100% - 150px);
}

.components-list-header {
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
}


.components-list-content {
  padding: 8px;
  height: calc(100% - 66px);
  overflow-y: auto;

  .components-title {
    color: #222;
    margin: 6px 6px;
    font-weight: bold;
    font-size: 12px;
    color: rgba(17, 31, 44, 0.6);
  }
}

.components-draggable {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.components-item {
  flex: 0 0 81px;
}

.components-item > .components-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: grab;
  background: #f5f7fa;
  padding: 8px;
}

.components-item > .components-body:hover {
  border: 1px dashed var(--el-color-primary);
  color: var(--el-color-primary);
}
</style>
