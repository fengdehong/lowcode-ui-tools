<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <el-radio-group style="width: 100%" v-model="mockValue" :placeholder="model.customConfig.placeholder">
      <el-radio v-for="option in model.customConfig.options"
                :key="option.value" :label="option.value">
        {{ option.label}}
      </el-radio>
    </el-radio-group>
  </FormItemWrap>
</template>

<script>
import FormItemWrap from "../components/FormItemWrap.vue";
import {FormBaseController} from "../FormBaseController";

export default {
  components: {FormItemWrap},
  props: {
    model: {type: FormBaseController},
  },
  data(){
    return {
      mockValue:undefined
    }
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
