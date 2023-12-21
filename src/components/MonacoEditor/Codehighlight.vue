<script setup>
import {onMounted, ref} from "vue";
import * as monaco from 'monaco-editor'

const props = defineProps({
  code: {}
});
const editorRef = ref(null);

onMounted(() => {
  monaco.editor.colorizeElement(editorRef.value, {});
})

</script>

<template>
  <pre ref="editorRef" class="pre-wrap" data-lang="text/css" style="width: 100%; height: 100%;">{{ code }}</pre>
</template>

<style scoped>
.pre-wrap {
  box-shadow:0px 0px 1px #dcdfe6 inset;
  border-radius: 4px;
  border: 1px solid var(--el-border-color);
  padding: 2px 7px;
  overflow: auto;
}
</style>
