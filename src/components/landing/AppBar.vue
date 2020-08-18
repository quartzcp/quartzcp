<template>
  <v-app-bar
    app
    color="transparent"
    elevation="0"
  >
    <!-- Platform logo -->
    <div class="d-flex">
      <svg-icon left>quartz</svg-icon>
      <span class="headline">Quartz CP</span>
    </div>

    <v-spacer />

    <!-- Button for each anchor -->
    <v-btn-toggle
      v-model="anchor"
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

    <div class="mx-2" />

    <!-- Go to the panel button -->
    <v-btn
      color="primary"
      text
      @click="goToPanel"
    >
      Go to panel
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data: () => ({
    anchor: '#home',
    anchors: [
      { name: 'Home', target: '#home' },
      { name: 'Features', target: '#features' },
      { name: 'Pricing', target: '#pricing' },
    ],
  }),
  watch: {
    /**
     * Scroll to an anchor when the value changes.
     *
     * @param value {string} The anchor name.
     */
    anchor(value) {
      this.$vuetify.goTo(value);
    },
  },
  methods: {
    /**
     * Go to the panel route.
     */
    goToPanel() {
      this.$router.push({ name: 'panel-overview' });
    },
  },
};
</script>
