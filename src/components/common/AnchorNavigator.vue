<template>
  <span class="anchor-navigator">
    <slot :target="target" :anchors="anchors">
      <!-- Button for each anchor -->
      <v-btn-toggle
        v-model="target"
        color="secondary"
        group
        mandatory
      >
        <v-btn
          v-for="{ name, target } in anchors"
          :key="name"
          small
          :value="target"
          v-text="name"
        />
      </v-btn-toggle>
    </slot>
  </span>
</template>

<script>
export default {
  name: 'AnchorNavigator',
  props: {
    anchors: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    target: '',
  }),
  watch: {
    /**
     * Scroll to an anchor when the value changes.
     *
     * @param value {string} The anchor name.
     */
    target(value) {
      this.$vuetify.goTo(value);
    },
  },
};
</script>
