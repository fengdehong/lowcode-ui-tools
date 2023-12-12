<script setup>
import RenderItem from "./RenderItem.vue";

defineProps({
  list: {type: Array, required: true},
});
</script>

<template>
  <div>
    <RenderItem v-for="element in list" :model="element"/>
  </div>
</template>

<style scoped>

</style>
