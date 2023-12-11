<template>
  <div>
    <el-form-item label="内容">
      <el-input type="textarea" rows="4" v-model="customConfig.content"></el-input>
    </el-form-item>
    <el-divider>属性</el-divider>
    <el-form-item label="字号">
      <el-input placeholder="请输入行高" type="number" v-model="customConfig.fontSize">
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="行高">
      <el-input placeholder="请输入行高" type="number" v-model="customConfig.lineHeight">
        <template slot="append">px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="字重">
      <el-input placeholder="请输入行高" type="number" v-model="customConfig.fontWeight">
      </el-input>
    </el-form-item>
    <el-form-item label="字体">
      <el-input placeholder="请输入字体" v-model="customConfig.fontFamily">
      </el-input>
    </el-form-item>

    <el-divider>色彩</el-divider>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="customConfig.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-color-picker v-model="customConfig.backgroundColor"></el-color-picker>
    </el-form-item>

    <el-form-item label="字体位置">
      <el-radio-group v-model="customConfig.textAlign">
        <el-radio-button label="left">左</el-radio-button>
        <el-radio-button label="center">中</el-radio-button>
        <el-radio-button label="right">右</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script>

/**
 * input的配置项
 */
export default {
  props: {
    customConfig: {type: Object, required: true}
  }
}
</script>
<style scoped>

</style>
