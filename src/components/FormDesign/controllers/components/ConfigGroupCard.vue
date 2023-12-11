<template>
  <div class="config-group-card">
    <div class="group__header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <i class="el-icon-circle-close" @click="onClose"/>
    <div class="group__body">
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigGroupCard",
  methods: {
    onClose(e) {
      this.$emit("close", e);
    }
  }
}
</script>

<style scoped>
.config-group-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
}

.config-group-card .group__header {
  background: #f5f7fa;
  /*height: 42px;*/
  /*line-height: 42px;*/
  padding: 4px 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
}


.config-group-card .el-icon-circle-close {
  position: absolute;
  right: -7px;
  top: -7px;
  cursor: pointer;
}

.config-group-card .el-icon-circle-close:hover {
  color: red
}

.config-group-card .group__body {
  padding: 10px 10px;
}
</style>
