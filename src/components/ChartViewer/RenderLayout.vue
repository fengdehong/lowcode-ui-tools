<script setup>
import RenderItem from "./RenderItem.vue";

defineProps({
  list: {type: Array, required: true},
});
</script>

<template>
  <RenderItem v-for="element in list" :model="element"/>
</template>

<style scoped>

</style>
