<template>
  <div>
    <div v-html="model.customConfig.html"/>
  </div>

</template>

<script>

export default {
  props: {
    model: {},
  }
}
</script>

<style scoped>

</style>
