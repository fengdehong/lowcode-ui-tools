<template>
  <GridLayout v-model:layout="layout"/>
</template>
<script setup>


import GridLayout from "@/components/GridLayout/GridLayout.vue";
import {ref} from "vue";

const layout = ref([
  {row: 1, column: 1, width: 4, height: 2, id: "0"},
  {row: 1, column: 5, width: 4, height: 4, id: "1"},
  {row: 1, column: 9, width: 4, height: 5, id: "2"},
  {row: 1, column: 13, width: 4, height: 3, id: "5"},
  {row: 5, column: 5, width: 4, height: 5, id: "6"},
])
</script>
<style>
.resizable-container {
  width: 100vw;
  min-height: 100vh;
  background: #edeff3;
  padding: 0;
}

</style>
