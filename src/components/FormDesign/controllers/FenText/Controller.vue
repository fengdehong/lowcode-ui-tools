<template>
  <i class="pre-icon" v-if="model.customConfig.leftIconClass" :class="model.customConfig.leftIconClass"/>
  {{ model.customConfig.content }}
  <i class="sub-icon" v-if="model.customConfig.rightIconClass" :class="model.customConfig.rightIconClass"/>
</template>

<script>

export default {
  props: {
    model: {},
    form: {}
  }
}
</script>

<style scoped>
.pre-icon,
.sub-icon {
  color: #337dff;
}

.pre-icon {
  margin-right: 2px;
}

.sub-icon {
  margin-left: 2px;
}
</style>
