<template>
  <Field
      v-model="form[model.formItemConfig.key]"
      :is-link="!readonly"
      readonly
      :name="model.formItemConfig.key"
      :label="model.formItemConfig.label"
      :placeholder="model.customConfig.placeholder"
      :required="model.formItemConfig.required"
      :rules="[{ required: model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]"
      @click="!readonly && (showPicker = true)"
  />
  <Popup v-model:show="showPicker" position="bottom">
    <Picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
    />
  </Popup>
</template>

<script>
import {Field, Picker, Popup} from 'vant';
import 'vant/es/field/style';
import 'vant/es/popup/style';
import 'vant/es/picker/style';

export default {
  props: {
    model: {type: Object},
    form: {type: Object, required: true},
    readonly: {type: Boolean, required: false}
  },
  components: {Field, Popup, Picker},
  data() {
    return {
      showPicker: false
    }
  },
  computed: {
    columns() {
      return this.model.customConfig.options.map(o => {
        return {
          text: o.label,
          value: o.value
        }
      })
    },
  },
  methods: {
    onConfirm({selectedOptions}) {
      this.form[this.model.formItemConfig.key] = selectedOptions[0]?.value
      this.showPicker = false;
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
