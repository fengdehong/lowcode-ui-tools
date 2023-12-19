<template>
  <GridLayout class="resizable-container" v-model:layout="layout"/>
</template>
<script setup>


import GridLayout from "@/components/GridLayout/GridLayout.vue";
import {ref} from "vue";

const layout = ref([
  {row: 1, column: 1, width: 4, height: 6, id: "0"},
  {row: 1, column: 6, width: 5, height: 6, id: "1"},
  {row: 2, column: 5, width: 4, height: 5, id: "2"},
  {row: 3, column: 5, width: 4, height: 5, id: "3"},
  {row: 6, column: 5, width: 4, height: 5, id: "4"},
])
</script>
<style>
.resizable-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: #edeff3;
  padding: 0;
}

</style>
