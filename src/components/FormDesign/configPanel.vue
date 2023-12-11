<template>
  <div class="config-panel">
    <div class="title">属性配置</div>
    <el-form size="small" label-position="top" class="config-form">
      <template v-if="activeItem.layoutConfig">
        <FormItemConfig v-if="activeItem instanceof FormBaseController" :config="activeItem.formItemConfig"/>
        <component v-if="activeItem.compType"
                   v-model:customConfig="activeItem.customConfig"
                   :is="activeItem.compType+'ConfigPanel'"/>
        <LayoutConfig v-model:layoutConfig="activeItem.layoutConfig"/>
      </template>
    </el-form>
  </div>
</template>

<script>

import LayoutConfig from "./controllers/components/LayoutConfig.vue";
import FormItemConfig from "./form-controllers/components/FormItemConfig.vue";
import {FormBaseController} from "./form-controllers/FormBaseController";

export default {
  name: 'configPanel',
  computed: {
    FormBaseController() {
      return FormBaseController
    }
  },
  components: {FormItemConfig, LayoutConfig},
  props: {
    pageConfig: {},
    activeItem: {
      type: Object,
      default: function () {
        return {}
      }
    },
    itemList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      currentTab: 'pageConfig',
      formIdArray: []
    }
  },
  watch: {
    activeItem(val) {
      if (val) {
        this.currentTab = "componentConfig";
      }
    }
  }

}
</script>
<style scoped>
.config-panel {
  height: 100%;
}

.config-panel .title {
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
}

.config-panel .config-form {
  padding: 16px;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>

<style>
.config-panel > .el-form,
.config-panel > .el-form > .el-tabs {
  height: 100%;
}

.config-panel > .el-form > .el-tabs {
  display: flex;
  flex-direction: column;
}

.config-panel > .el-form > .el-tabs > .el-tabs__header {
  flex: 1 1 40px;
  margin-bottom: 0;
}

.config-panel > .el-form > .el-tabs > .el-tabs__header .el-tabs__item {
  padding: 4px 8px 4px 16px;
}

.config-panel > .el-form > .el-tabs > .el-tabs__content {
  flex: 1 1 100%;
  padding: 16px;
  overflow-y: auto;
}

.config-panel .el-form-item__label {
  font-weight: bold;
  --el-text-color-regular: rgb(144, 147, 153);
}
</style>
