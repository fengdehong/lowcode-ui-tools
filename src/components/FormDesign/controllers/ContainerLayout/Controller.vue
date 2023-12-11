<template>
  <LayoutWrap :model="model">
    <div class="container-layout"
         :style="{background:background,backgroundPosition:'center center',backgroundSize:'cover'}">
      <div class="container-layout-container"
           :style="{maxWidth:model.customConfig.contentMaxWidth+'px'}">
        <draggable :class="{'drag-wrapper row-drag':true,'is-empty':column.list.length===0}"
                   draggable=".item"
                   v-model="column.list" :animation="100"
                   :group="{ name: 'componentsGroup', pull: true, put: true }"
                   @add="e=>handlerAdd(e,column)">
          <div class="item" v-for="element in column.list" :key="element.id">
            <DesignItemAuto :model="element"
                            @click="designStore.setActiveItem(element)"
                            @copied="onCopy(column,element)"
                            @deleted="onDelete(column,element)"/>
          </div>
        </draggable>
      </div>
    </div>
  </LayoutWrap>

</template>

<script>
import draggable from "vuedraggable";
import {DesignStore} from "../../DesignStore";
import DesignItemAuto from "../../designItemAuto.vue";
import LayoutWrap from "../components/LayoutWrap.vue";
import {resourceUrl} from "../../utils/resource-utils";

export default {
  components: {LayoutWrap, DesignItemAuto, draggable},
  props: {
    model: {}
  },
  data() {
    return {
      designStore: DesignStore
    }
  },
  computed: {
    column() {
      return this.model.customConfig.columns[0];
    },
    background() {
      let background = this.model.customConfig.background;
      //ea786220ff9f1dfed57b0eff1c52f390
      if (/[0-91-z]{32,64}/.test(background)) {
        return `url(${resourceUrl(background)}) no-repeat`
      } else if (!background || background === 'resource/') {
        return '';
      }
      return background;
    }
  },
  methods: {
    handlerAdd(evt, column) {
      if (evt.pullMode === 'clone') {
        column.list.splice(evt.newIndex, 0, this.designStore.activeItem);
      }
    },
    onCopy(column, origin) {
      const clone = origin.clone();
      let oldIndex = column.list.indexOf(origin);
      if (oldIndex >= 0) {
        column.list.splice(oldIndex, 0, clone);
      } else {
        column.list.push(clone);
      }
      this.designStore.setActiveItem(clone);
    },
    onDelete(column, origin) {
      const index = column.list.findIndex(item => item.id === origin.id);
      column.list.splice(index, 1);
      this.designStore.setActiveItem({});
    }
  }
}
</script>

<style scoped>
.container-layout {
  display: flex;
  justify-content: center;
}

.container-layout-container {
  flex: 1 1 auto;
}

.drag-wrapper.row-drag {
  display: block;
  height: 100%;
}

.drag-wrapper.row-drag.is-empty {
  min-height: 50px;
  min-width: 200px;
  border: 1px solid #e5e9f2;
}
</style>
