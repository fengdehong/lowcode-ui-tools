<script setup>
import FormDesigner from "./components/FormDesign/FormDesigner.vue";
import {DesignStore} from "./components/FormDesign/DesignStore.js";
import {reactive, ref} from "vue";
import {FormNumber} from "./components/FormDesign/form-controllers/FormNumber/index.js";
import {FormPassword} from "./components/FormDesign/form-controllers/FormPassword/index.js";
import {FormTextarea} from "./components/FormDesign/form-controllers/FormTextarea/index.js";
import {FormTextbox} from "./components/FormDesign/form-controllers/FormTextbox/index.js";
import {FormSelect} from "./components/FormDesign/form-controllers/FormSelect/index.js";
import {FormCheckbox} from "./components/FormDesign/form-controllers/FormCheckbox/index.js";
import {FormDate} from "./components/FormDesign/form-controllers/FormDate/index.js";
import {FormImage} from "./components/FormDesign/form-controllers/FormImage/index.js";
import {FormRadioGroup} from "./components/FormDesign/form-controllers/FormRadioGroup/index.js";
import {FormRate} from "./components/FormDesign/form-controllers/FormRate/index.js";
import {FenText} from "./components/FormDesign/controllers/FenText/index.js";
import FormViewer from "./components/FormViewer/FormViewer.vue";
import {jsonConfigFormFields} from "./components/FormDesign/utils/ControllerConfigUtils.js";
import FormViewerH5 from "./components/FormViewer/FormViewerH5.vue";

/**
 *
 * @type {DesignStore}
 */
const designStore = reactive(new DesignStore());
const designGroups = [
  {
    group: "表单控件",
    controllers: [
      FormTextbox,
      FormTextarea,
      FormNumber,
      FormPassword,
      FormImage,
      FormSelect,
      FormDate,
      FormRadioGroup,
      FormCheckbox,
      FormRate,
    ]
  },
  {
    group: "展示",
    controllers: [
      FenText,
    ]
  }
]

let controllers = [];
for (let designGroup of designGroups) {
  for (let controller of designGroup.controllers) {
    // controller.registry(GlobalContext.app);
    controllers.push(controller);
  }
}

const activeName = ref("designer");
const json = ref({});
const formFields = ref([]);

function handleClick() {
  json.value = JSON.parse(designStore.getJsonString());
  formFields.value = jsonConfigFormFields(json.value);
  console.log("formFields.value:", formFields.value);
}

const form = reactive({});
</script>

<template>
  <div class="design-form">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="designer" name="designer">
        <div class="tab-wrap designer">
          <FormDesigner :design-store="designStore"
                        :design-groups="designGroups"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="viewer" name="viewer">
        <div class="tab-wrap viewer">
          <FormViewer class="form-viewer" v-if="activeName==='viewer'" :form-fields="formFields"
                      :controllers="controllers" :json="json" :form="form"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="viewer-h5" name="viewer-h5">
        <div class="tab-wrap viewer">
          <FormViewerH5 class="form-viewer h5" v-if="activeName==='viewer-h5'" :form-fields="formFields"
                        :controllers="controllers" :json="json" :form="form"/>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<style scoped>
.design-form {
  height: 100vh;
  max-height: 100vh;
}

.tab-wrap {
  height: calc(100vh - 60px);
}

.tab-wrap.viewer {
  background: #f5f7fa;
  padding: 16px;
}

.form-viewer {
  background: #FFFFFF;
  width: 600px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 8px;
}

.form-viewer.h5 {
  width: 400px;
  height: calc(100vh - 80px);
  padding: 0;
}
</style>
