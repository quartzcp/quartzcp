<template>
  <div id="login-form">
    <h1 class="overline mb-4">
      <v-icon x-small>mdi-lock-outline</v-icon>
      Login
    </h1>
    <p class="body-2">Sign in with your existing Quartz CP account</p>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row justify="start">
        <v-col :cols="6">
          <!-- Email and password fields -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail address"
            outlined
            required
            prepend-icon="mdi-at"
            autocomplete="email"
            type="email"
          />
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            outlined
            counter
            prepend-icon="mdi-form-textbox-password"
            autocomplete="current-password"
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
    </v-form>

    <!-- Login and registration buttons -->
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="$emit('change-page', 'register')"
      >
        Register
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="!valid"
        :loading="loading"
        raised
        color="primary"
        @click="submit"
      >
        Sign in
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import store from '@/store';

const rules ={
  required: v => !!v || 'Required',
  min: minLength => v => v.length >= minLength || `Min ${minLength} characters`,
  email: v => !!v.match(/^\S+@\S+$/) || 'Must be a valid email address',
};

export default {
  name: 'LoginForm',
  data: () => ({
    valid: false,
    loading: false,
    email: '',
    emailRules: [rules.required, rules.min(5), rules.email],
    password: '',
    passwordRules: [rules.required, rules.min(8)],
    showPassword: false,
  }),
  methods: {
    async submit() {
      // The registration form must be valid before it can be submitted.
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;

      const { email, password } = this;
      try {
        await store.dispatch('signIn', {
          email, password
        });
      } catch (error) {
        /*
         * Encountered an error during login, so show a snackbar containing the
         * error message.
         */
        let message = 'An unknown error occurred.';
        switch (error.code) {
          case 'auth/invalid-email': {
            message = 'Must be a valid email address.';
            break;
          }
          case 'auth/user-disabled': {
            message = 'This user account has been disabled.';
            break;
          }
          case 'auth/user-not-found': {
            message = 'No user corresponding to the given email address.';
            break;
          }
          case 'auth/wrong-password': {
            message = 'Incorrect password.';
            break;
          }
        }
        this.$emit('show-snackbar', message);
        console.error(error);
        this.loading = false;
      }
    },
  },
};
</script>
