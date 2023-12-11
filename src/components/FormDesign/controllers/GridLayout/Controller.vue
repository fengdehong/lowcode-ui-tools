<template>
  <LayoutWrap :layout-config="model.layoutConfig">
    <div class="grid-layout" :style="{
      gap:model.customConfig.gap+'px',
    }">
      <div class="grid-layout-column" v-for="column in model.customConfig.columns" :key="column.id">
        <LayoutSlot v-model:list="column.list"/>
      </div>
    </div>
  </LayoutWrap>
</template>

<script>
import {DesignStore} from "../../DesignStore";
import LayoutWrap from "../components/LayoutWrap.vue";
import LayoutSlot from "../../LayoutSlot.vue";

export default {
  components: {LayoutSlot, LayoutWrap},
  props: {
    model: {}
  },
  data() {
    return {
      designStore: DesignStore
    }
  },
}
</script>

<style scoped>
.grid-layout {
  display: flex;
  align-content: stretch;
}

.grid-layout-column {
  flex: 1 1 auto;
}
</style>
