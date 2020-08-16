<template>
  <div
    class="svg-icon"
    :style="style"
    v-html="require(`!html-loader!../../assets/icons/${icon}.svg`)"
  />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    /**
     * The default size for the SvgIcon is 24px.
     */
    size: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    /**
     * Use the text content of the slot for the icon name.
     *
     * @returns {string} The name of the icon to display.
     */
    icon() {
      return this.$slots.default[0].text;
    },
    /**
     * Calculate the style object for the component.
     *
     * @returns {*} The style object.
     */
    style() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
  },
};
</script>

<style lang="scss">
.svg-icon {
  display: inline-block;
  align-self: center;
  fill: currentColor;
  height: 1em;
  width: 1em;

  // Add a margin to the left or right with the "right" and "left" attributes.
  &[left] {
    margin-right: 8px;
  }

  &[right] {
    margin-left: 8px;
  }
}
</style>
