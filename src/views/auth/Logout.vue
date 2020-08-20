<template>
  <v-card class="mx-auto mt-8" :loading="true" width="300">
    <v-card-title>
      <v-icon left>mdi-logout-variant</v-icon>
      Signing out...
    </v-card-title>
    <v-card-text>Please wait a moment</v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Logout',
  methods: {
    ...mapActions(['signOut']),
  },
  async mounted() {
    await this.signOut();
    await this.$router.push('/');
  },
};
</script>
