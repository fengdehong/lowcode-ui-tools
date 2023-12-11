<template>
  <div>
    <el-form-item label="最大内容宽度" label-width="100px">
      <el-input placeholder="最大内容宽度" type="number" v-model="props.customConfig.contentMaxWidth">
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
  </div>
</template>
<script>

/**
 * 配置项
 */
export default {
  props: ['props'],
}
</script>
<style scoped>
/*.input {*/
/*  width: 75%*/
/*}*/

.link-item {
  display: grid;
  grid-template-columns: 83px 1fr 20px;
}

.link-item .el-input:nth-child(1) ::v-deep .el-input__inner {
  border-right-width: 0;
  border-radius: 4px 0 0 4px;
}

.link-item:focus {
  background: #0B9443;
}

.link-item .el-input:nth-child(1):after {
  content: "-";
  color: #DCDFE6;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 32px;
}

.link-item .el-input:nth-child(2) ::v-deep .el-input__inner {
  border-left-width: 0;
  border-radius: 0 4px 4px 0;
}

.link-item + .link-item {
  margin-top: 10px;
}

.close-btn {
  text-align: center;
}

.close-icon:hover {
  cursor: pointer;
}

.close-btn >>> .el-icon-remove-outline {
  color: red
}
</style>
