<template>
  <div id="landing">
    <app-bar>
      <v-spacer />
      <anchor-navigator :anchors="anchors" />

      <div class="mx-2" />

      <!-- Go to the panel button -->
      <v-btn
        color="primary"
        text
        @click="goToPanel"
      >
        Go to panel
      </v-btn>
    </app-bar>

    <h1 id="home">Home</h1>
    <h1 id="features">Features</h1>
    <h1 id="pricing">Pricing</h1>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data: () => ({
    anchors: [
      { name: 'Home', target: '#home' },
      { name: 'Features', target: '#features' },
      { name: 'Pricing', target: '#pricing' },
    ],
  }),
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

<style lang="scss">
#landing {
  h1 {
    margin-bottom: 720px;
  }
}
</style>
