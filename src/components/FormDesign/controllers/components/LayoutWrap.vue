<template>
  <div :style="style" class="layout-wrap">
    <slot name="default"/>
  </div>
</template>

<script>

export default {
  name: "LayoutWrap",
  props: {
    layoutConfig: {type: Object, required: true}
  },
  computed: {
    style() {
      let layoutConfig = this.layoutConfig
      let style = "";
      style += `margin: ${layoutConfig.marginTop}px ${layoutConfig.marginRight}px ${layoutConfig.marginBottom}px ${layoutConfig.marginLeft}px;`;
      style += `padding: ${layoutConfig.paddingTop}px ${layoutConfig.paddingRight}px ${layoutConfig.paddingBottom}px ${layoutConfig.paddingLeft}px;`;
      return style;
    }
  }
}
</script>

<style scoped>
.layout-wrap {
  width: 100%;
  height: 100%;
}
</style>
