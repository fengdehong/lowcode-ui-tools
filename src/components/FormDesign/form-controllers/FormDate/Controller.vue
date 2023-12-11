<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <ElInput :placeholder="model.customConfig.placeholder"/>
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
