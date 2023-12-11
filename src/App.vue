<script setup>
import FormDesigner from "./components/FormDesign/FormDesigner.vue";
import {DesignStore} from "./components/FormDesign/DesignStore.js";
import {reactive} from "vue";
import {FormInput} from "./components/FormDesign/form-controllers/FormInput/index.js";
import {FormSelect} from "./components/FormDesign/form-controllers/FormSelect/index.js";
import {FormDate} from "./components/FormDesign/form-controllers/FormDate/index.js";
import {FormRadioGroup} from "./components/FormDesign/form-controllers/FormRadioGroup/index.js";
import {FenText} from "./components/FormDesign/controllers/FenText/index.js";

const designStore = reactive(new DesignStore());
const designGroups = [
  {
    group: "表单控件",
    controllers: [
      FormInput,
      FormSelect,
      FormDate,
      FormRadioGroup,
    ]
  },
  {
    group: "展示",
    controllers: [
      FenText,
    ]
  }
]
</script>

<template>
  <div class="design-form">
    <FormDesigner :design-store="designStore"
                  :design-groups="designGroups"/>
  </div>

</template>

<style scoped>
.design-form {
  height: 100vh;
  max-height: 100vh;
}
</style>
