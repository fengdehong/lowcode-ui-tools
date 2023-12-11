<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <ElSelect style="width: 100%" :placeholder="model.customConfig.placeholder">
      <ElOption v-for="option in model.customConfig.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"/>
    </ElSelect>
  </FormItemWrap>
</template>

<script>
import FormItemWrap from "../components/FormItemWrap.vue";
import {FormBaseController} from "../FormBaseController";

export default {
  components: {FormItemWrap},
  props: {
    model: {type: FormBaseController},
  }
}
</script>

<style scoped>
.fen-text i {
  color: #337dff;
}

.fen-text .pre-icon {
  margin-right: 2px;
}

.fen-text .sub-icon {
  margin-left: 2px;
}
</style>
