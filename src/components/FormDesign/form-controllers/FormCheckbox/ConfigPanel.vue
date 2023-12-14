<template>
  <OptionsConfig v-model="customConfig.options"/>
</template>
<script setup>
import OptionsConfig from "../components/OptionsConfig.vue";

defineProps({
  customConfig: {type: Object, required: true}
})
</script>
<style scoped>

</style>
