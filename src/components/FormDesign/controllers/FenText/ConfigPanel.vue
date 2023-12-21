<template>
  <div>
    <el-form-item label="内容">
      <el-input type="textarea" rows="4" v-model="customConfig.content"></el-input>
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
