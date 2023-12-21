<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

if (!self.MonacoEnvironment) {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new JsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new CssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new HtmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new TsWorker()
      }
      return new EditorWorker()
    }
  }
}

const props = defineProps({
  modelValue: {},
  language: {default: "html"}
});
const emits = defineEmits(["update:modelValue"]);

const editorRef = ref(null);
/**
 *
 * @type {import('monaco-editor').IStandaloneCodeEditor}
 */
let monacoEditor = null;


onMounted(() => {
  monacoEditor = monaco.editor.create(editorRef.value, {
    value: props.modelValue,
    theme: "vs-dark", // 主题
    language: props.language,
    folding: true, // 是否折叠
    roundedSelection: false,
    foldingHighlight: false, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    minimap: {
      enabled: false // 是否启用预览图
    }, // 预览图设置
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: "on", // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    enableSplitViewResizing: false,
    readOnly: false, //是否只读  取值 true | false
  });
  monacoEditor.onDidChangeModelContent(e => {
    console.log("editor change:", e);
    emits("update:modelValue", monacoEditor.getValue());
  })
  onUnmounted(() => monacoEditor.dispose());
})

</script>

<template>
  <div ref="editorRef" style="width: 100%; height: 100%;"/>
</template>

<style scoped>

</style>
