<template>
  <div>
    <el-form-item label="列数">
      <div class="columns-input">
        <span>
          <a title="删除一列" class="el-icon-remove-outline" @click="removeColumn"/>
          <a title="添加一列" class="el-icon-circle-plus-outline" @click="addColumn"/>
        </span>
      </div>
    </el-form-item>
    <el-form-item label="间隔">
      <el-input placeholder="请输入行高" type="number" v-model="props.customConfig.gap">
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
  </div>
</template>
<script>
import {getSimpleId} from "../../utils/IdGenerate";

/**
 * 配置项
 */
export default {
  props: {
    customConfig: {type: Object, required: true}
  },
  emits: ['update:customConfig'],
  methods: {
    removeColumn(e) {
      e.stopPropagation();
      if (this.customConfig.columns.length === 1) {
        this.$notify.warning("最小配置1列");
        return;
      }
      let conf = {...this.customConfig};
      conf.columns.pop();
      this.$emit("update:customConfig", conf);
    },
    addColumn(e) {
      e.stopPropagation();
      if (this.customConfig.columns.length === 24) {
        this.$notify.warning("最大配置24列");
        return;
      }
      let conf = {...this.customConfig};
      conf.columns.push({
        id: getSimpleId(),
        list: []
      })
      this.$emit("update:customConfig", conf);
    }
  }
}
</script>
<style scoped>
.columns-input {
  border-bottom: 1px solid #DCDFE6;
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.el-icon-remove-outline {
  color: #f56c6c;
}

.el-icon-circle-plus-outline {
  color: #67c23a;
}
</style>
