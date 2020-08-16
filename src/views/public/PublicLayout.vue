<template>
  <v-app>
    <app-bar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { AppBar } from '@/components/public';

export default {
  name: 'PublicLayout',
  components: { AppBar },
};
</script>
