<template>
  <div class="inline-edit-text" @click="showInput">
    <el-input v-if="inputVisible" class="input-new-tag" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <template v-else>{{ value }}</template>
  </div>
</template>

<script>
export default {
  name: "InlineEditText",
  props: {value: {}},
  data() {
    return {
      inputValue: '',
      inputVisible: false
    }
  },
  methods: {
    showInput() {
      this.inputValue = this.value;
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      this.$emit("input", this.inputValue);
      this.inputVisible = false;
    }
  }
}
</script>

<style scoped>
.inline-edit-text {
  display: inline-block;
  cursor: text;
}
</style>
