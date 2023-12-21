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
          <BorderSelecter v-model="borderSelected"/>
          <div class="border-config-inputs">
            <LayoutBorderConfig v-if="borderSelected==='left'" v-model="config.borderLeft"/>
            <LayoutBorderConfig v-else-if="borderSelected==='right'" v-model="config.borderRight"/>
            <LayoutBorderConfig v-else-if="borderSelected==='top'" v-model="config.borderTop"/>
            <LayoutBorderConfig v-else-if="borderSelected==='bottom'" v-model="config.borderBottom"/>
            <LayoutBorderConfig v-else-if="borderSelected==='all'" v-model="config.border"/>
          </div>
        </div>
      </el-collapse-item>

      <el-tooltip
          ref="tooltipRef"
          :visible="tipVisible"
          :popper-options="{
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  adaptive: false,
                  enabled: false,
                },
              },
            ],
          }"
          :virtual-ref="tipTargetRef"
          virtual-triggering
          popper-class="singleton-tooltip"
          effect="light">
        <template #content>
          <span>{{ tipTargetRef.dataset.tip }}</span>
        </template>
      </el-tooltip>
    </el-collapse>
  </div>
</template>

<script>

import LayoutBorderConfig from "@/components/FormDesign/controllers/components/LayoutBorderConfig.vue";
import BorderSelecter from "@/components/FormDesign/controllers/components/BorderSelecter.vue";

export default {
  name: "LayoutConfig",
  components: {BorderSelecter, LayoutBorderConfig},
  props: {
    layoutConfig: {type: Object, required: true}
  },
  emits: ["update:layoutConf"],
  data() {
    return {
      tipTargetRef: null,
      tipVisible: false,
      borderSelected: "all",
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
  },
  mounted() {
    /**
     * @type {HTMLDivElement[]}
     */
    let tipTargets = this.$el.querySelectorAll("[data-tip]");
    for (let tipTarget of tipTargets) {
      tipTarget.onmouseenter = e => {
        this.tipVisible = true;
        this.tipTargetRef = e.currentTarget;
      }
      tipTarget.onmouseleave = e => this.tipVisible = false;
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
  column-gap: 6px;
  -webkit-column-gap: 6px;
  -moz-column-gap: 6px;
}

.config-sub-item + .config-sub-item {
  margin-top: 12px;
}

.config-sub-item.border {
  position: relative;
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
