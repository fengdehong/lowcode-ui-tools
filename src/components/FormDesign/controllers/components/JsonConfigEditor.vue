<template>
  <div></div>
</template>

<script>
import {editor as MonacoEditor} from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';

export default {
  name: "JsonConfigEditor",
  props: {
    value: {}
  },
  mounted() {
    const editor = MonacoEditor.create(this.$el, {
      /* 一些配置， 比如说主题，语言类型，等等 */
      theme: 'vs',
      /* 语言 */
      language: 'json',
      /* 是否只读 */
      readOnly: false,
      /* 初始值 */
      value: this.value,
      /* 自动布局 */
      automaticLayout: true,
      /* 阻止编辑器滚动到最后一行之外 */
      scrollBeyondLastLine: true,
    });
  }
}
</script>

<style scoped>

</style>
