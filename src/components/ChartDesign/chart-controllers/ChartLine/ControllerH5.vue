<template>
  <div class="fen-text" :style="{
    fontFamily:model.customConfig.fontFamily,
    fontSize:model.customConfig.fontSize+'px',
    fontWeight:model.customConfig.fontWeight,
    lineHeight:model.customConfig.lineHeight+'px',
    color:model.customConfig.color,
    backgroundColor:model.customConfig.backgroundColor,
    textAlign:model.customConfig.textAlign,
  }">
    <i class="pre-icon" v-if="model.customConfig.leftIconClass" :class="model.customConfig.leftIconClass"/>
    {{ model.customConfig.content }}
    <i class="sub-icon" v-if="model.customConfig.rightIconClass" :class="model.customConfig.rightIconClass"/>
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
.fen-text i {
  color: #337dff;
}

.fen-text .pre-icon {
  margin-right: 2px;
}

.fen-text .sub-icon {
  margin-left: 2px;
}
</style>
