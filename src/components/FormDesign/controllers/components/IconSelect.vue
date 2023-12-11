<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "IconSelect",
  props: ['value'],
  emits: ['input'],
  data() {
    return {
      icons: [
        {label: "指南", value: "el-icon-discover"},
        {label: "视频", value: "el-icon-video-camera"},
        {label: "问题", value: "el-icon-question"},
        {label: "信息", value: "el-icon-info"},
        {label: "编辑", value: "el-icon-edit"},
        {label: "分享", value: "el-icon-share"},
        {label: "删除", value: "el-icon-delete"},
        {label: "设置", value: "el-icon-setting"},
      ]
    }
  },
  methods: {
    onSelect(item) {
      this.$emit("input", item.value);
    },
    onClean() {
      this.$emit("input", null);
    }
  }
})
</script>

<template>
  <el-popover placement="top" width="382" trigger="click">
    <div class="icon-list">
      <span v-for="item in icons" :key="item.value"
            :class="{[item.value]:true,'icon-item':true,'active':item.value===value}"
            @click="onSelect(item)">
        {{ item.label }}
      </span>
    </div>
    <div style="text-align: right; margin: 10px 4px 0">
      <ElLink size="small" type="primary" @click="onClean">清空</ElLink>
    </div>
    <template #reference>
      <span class="value-icon">
        <i v-if="value" :class="value"/>
        <i v-else class="not-select el-icon-close"/>
      </span>
    </template>
  </el-popover>
</template>

<style scoped>
.icon-list {
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
  border-radius: 4px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  max-height: 250px;
  overflow-y: auto;
}

.icon-list .icon-item {
  font-size: 14px;
  flex: 0 0 80px;
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #eaeefb;
  cursor: pointer;
}

.icon-list .icon-item.active,
.icon-list .icon-item:hover {
  -webkit-box-shadow: 2px 2px 8px 0 #d9e4f6;
  box-shadow: 2px 2px 8px 0 #d9e4f6;
  color: #337dff;
  border-color: #337dff;
}

.icon-list .icon-item:before {
  font-size: 20px;
}

.value-icon {
  height: 28px;
  width: 28px;
  font-size: 14px;
  padding: 4px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
}

.value-icon .not-select {
  border: 1px solid #e6e6e6;
  color: #999;
}
</style>
