<template>
  <div v-if="fieldVisible(model.formItemConfig)" class="drawing-item">
    <LayoutWrap :layout-config="model.layoutConfig">
      <Component :is="model.compType" :model="model" :form="form"/>
    </LayoutWrap>
  </div>
</template>

<script setup>
import LayoutWrap from "../FormDesign/controllers/components/LayoutWrap.vue";
import {useFormContext} from "../FormDesign/utils/useFormContext";

const props = defineProps({
  model: {type: Object, required: true}
});
const {form, fieldVisible} = useFormContext();

</script>

<style scoped>
</style>
