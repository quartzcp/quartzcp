<template>
  <div id="landing">
    <app-bar />

    <h1 id="home">Home</h1>
    <h1 id="features">Features</h1>
    <h1 id="pricing">Pricing</h1>
  </div>
</template>

<script>
import { AppBar } from '@/components/landing';

export default {
  name: 'Landing',
  components: { AppBar },
};
</script>

<style>
h1 {
  margin-bottom: 720px;
}
</style>
