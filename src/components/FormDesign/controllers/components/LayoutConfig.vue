<template>
  <div>
    <el-divider>样式</el-divider>
    <el-collapse class="style-config-collapse">
      <el-collapse-item title="Padding" name="Padding">
        <div class="padding-box">
          <div>
            <span>左：</span>
            <el-input type="number" v-model="config.paddingLeft">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>右：</span>
            <el-input type="number" v-model="config.paddingRight">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>上：</span>
            <el-input type="number" v-model="config.paddingTop">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>下：</span>
            <el-input type="number" v-model="config.paddingBottom">
              <template #suffix>px</template>
            </el-input>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Margin" name="Margin">
        <div class="margin-box">
          <div>
            <span>左：</span>
            <el-input type="number" v-model="config.marginLeft">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>右：</span>
            <el-input type="number" v-model="config.marginRight">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>上：</span>
            <el-input type="number" v-model="config.marginTop">
              <template #suffix>px</template>
            </el-input>
          </div>
          <div>
            <span>下：</span>
            <el-input type="number" v-model="config.marginBottom">
              <template #suffix>px</template>
            </el-input>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体" name="字体">

        <div class="config-sub-item">
          <span>字号：</span>
          <el-input placeholder="请输入字号" type="number" v-model="config.fontSize" style="width:106px">
            <template #suffix>px</template>
          </el-input>
        </div>
        <div class="config-sub-item">
          <span>字重：</span>
          <el-select v-model="config.fontWeight" placeholder="Select" style="width:106px">
            <el-option
                v-for="item in fontWeightOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div class="config-sub-item">
          <span>行高：</span>
          <el-input placeholder="请输入行高" type="number" v-model="config.lineHeight" style="width:106px">
            <template #suffix>px</template>
          </el-input>
        </div>
        <div class="config-sub-item">
          <span>颜色：</span>
          <el-color-picker v-model="config.color" name="字体颜色"/>
        </div>
        <div class="config-sub-item">
          <span>对齐：</span>
          <el-radio-group v-model="config.textAlign">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="center">中</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="边框" name="边框">
        <div class="config-sub-item border">
          <div class="border-config-sides">
            <div class="border-config-item left" :class="{selected:borderSelected==='left'}"
                 @click="borderSelected='left'">
              <span data-tip="左边框">┣</span>
            </div>
            <div class="border-config-item top" :class="{selected:borderSelected==='top'}"
                 @click="borderSelected='top'">
              <span data-tip="上边框">┳</span>
            </div>
            <div class="border-config-item bottom" :class="{selected:borderSelected==='bottom'}"
                 @click="borderSelected='bottom'">
              <span data-tip="下边框">┻</span>
            </div>
            <div class="border-config-item right" :class="{selected:borderSelected==='right'}"
                 @click="borderSelected='right'">
              <span data-tip="右边框">┫</span>
            </div>
            <div class="border-config-item all" :class="{selected:borderSelected==='all'}"
                 @click="borderSelected='all'">
              <span data-tip="所有框">╋</span>
            </div>
          </div>
          <div class="border-config-inputs"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: "LayoutConfig",
  props: {
    layoutConfig: {type: Object, required: true}
  },
  emits: ["update:layoutConf"],
  data() {
    return {
      borderSelected: null,
      fontWeightOptions: [
        {value: 400, label: "常规"},
        {value: 500, label: "加粗"},
        {value: 600, label: "超粗"},
      ]
    }
  },
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


.config-sub-item {
  display: flex;
  align-items: center;
}

.config-sub-item + .config-sub-item {
  margin-top: 12px;
}

.config-sub-item.border {
  position: relative;
}

.border-config-sides {
  position: relative;
  width: 80px;
  height: 82px;
  color: var(--el-text-color);
}

.border-config-sides .border-config-item {
  position: absolute;
  font-size: 16px;
  line-height: 16px;
  padding: 4px;
  border-radius: 2px;
  --position-width: 28px;
  cursor: pointer;
}

.border-config-sides .border-config-item.selected,
.border-config-sides .border-config-item:hover {
  background: var(--el-color-info-light-3);
}

.border-config-sides .border-config-item.left {
  left: 0;
  top: var(--position-width);
}

.border-config-sides .border-config-item.top {
  top: 0;
  left: var(--position-width);
}

.border-config-sides .border-config-item.right {
  right: 0;
  top: var(--position-width);
}

.border-config-sides .border-config-item.bottom {
  bottom: 0;
  left: var(--position-width);
}

.border-config-sides .border-config-item.all {
  top: var(--position-width);
  left: var(--position-width);
}
</style>
<style>
.style-config-collapse {
  line-height: 20px;
  --el-collapse-header-text-color: var(--el-text-color-regular);
  --el-collapse-header-height: 36px;
  margin-bottom: 16px;
}

.style-config-collapse .el-collapse-item__header {
  border-radius: 0;
  font-weight: normal;
}

.style-config-collapse .el-collapse-item__content {
  padding: 10px;
  border-radius: 4px;
  background: var(--el-bg-color-page);
}
</style>
