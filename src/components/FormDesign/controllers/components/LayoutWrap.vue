<template>
  <div :style="style" class="layout-wrap">
    <slot/>
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
      let layoutConfig = this.layoutConfig;
      let style = {
        margin: `${layoutConfig.marginTop}px ${layoutConfig.marginRight}px ${layoutConfig.marginBottom}px ${layoutConfig.marginLeft}px`,
        padding: `${layoutConfig.paddingTop}px ${layoutConfig.paddingRight}px ${layoutConfig.paddingBottom}px ${layoutConfig.paddingLeft}px`,
        color: layoutConfig.color,
        fontFamily: layoutConfig.fontFamily,
        fontSize: layoutConfig.fontSize + 'px',
        fontWeight: layoutConfig.fontWeight,
        lineHeight: layoutConfig.lineHeight + 'px',
        backgroundColor: layoutConfig.backgroundColor,
        textAlign: layoutConfig.textAlign,
      };
      if (layoutConfig.border) {
        style.border = layoutConfig.border;
      } else {
        Object.assign(style, {
          border: layoutConfig.border,
          borderLeft: layoutConfig.borderLeft,
          borderRight: layoutConfig.borderRight,
          borderTop: layoutConfig.borderTop,
          borderBottom: layoutConfig.borderBottom,
        })
      }
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
