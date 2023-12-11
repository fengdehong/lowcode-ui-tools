<template>
  <div>
    <el-divider>布局</el-divider>
    <el-form-item label="外边距离">
      <div class="margin-box">
        <div>
          <span>左：</span>
          <el-input type="number" v-model="config.marginLeft"/>
        </div>
        <div>
          <span>右：</span>
          <el-input type="number" v-model="config.marginRight"/>
        </div>
        <div>
          <span>上：</span>
          <el-input type="number" v-model="config.marginTop"/>
        </div>
        <div>
          <span>下：</span>
          <el-input type="number" v-model="config.marginBottom"/>
        </div>
      </div>

    </el-form-item>
    <el-form-item label="内边距离">
      <div class="padding-box">
        <div>
          <span>左：</span>
          <el-input type="number" v-model="config.paddingLeft"/>
        </div>
        <div>
          <span>右：</span>
          <el-input type="number" v-model="config.paddingRight"/>
        </div>
        <div>
          <span>上：</span>
          <el-input type="number" v-model="config.paddingTop"/>
        </div>
        <div>
          <span>下：</span>
          <el-input type="number" v-model="config.paddingBottom"/>
        </div>
      </div>

    </el-form-item>
  </div>
</template>

<script>

export default {
  name: "LayoutConfig",
  props: {
    layoutConfig: {type: Object, required: true}
  },
  emits: ["update:layoutConf"],
  computed: {
    config: {
      get() {
        return this.layoutConfig;
      },
      set(val) {
        this.$emit("update:layoutConf", {...val});
      }
    }
  }
}
</script>

<style scoped>
.margin-box,
.padding-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.margin-box *,
.padding-box * {
  display: flex;
}

.margin-box * span,
.padding-box * span {
  height: 24px;
  line-height: 24px;
}

.margin-box ::v-deep .el-input__inner,
.padding-box ::v-deep .el-input__inner {
  padding: 0 2px;
  height: 24px;
  line-height: 24px;
}
</style>
