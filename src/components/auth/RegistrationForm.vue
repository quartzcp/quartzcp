<template>
  <div id="registration-form">
    <h1 class="overline mb-4">
      <v-icon x-small>mdi-lock-outline</v-icon>
      Registration
    </h1>
    <p class="body-2">Setup your new account with Quartz CP</p>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row justify="start">
        <v-col :cols="6">
          <!-- Name, email and password fields -->
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            outlined
            required
            prepend-icon="mdi-passport"
            autocomplete="name"
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail address"
            outlined
            required
            prepend-icon="mdi-at"
            autocomplete="email"
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
            autocomplete="new-password"
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
        @click="$emit('change-page', 'login')"
      >
        Login
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="!valid"
        :loading="loading"
        raised
        color="primary"
        @click="submit"
      >
        Register
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import store from '@/store';

const rules = {
  required: v => !!v || 'Required',
  min: minLength => v => v.length >= minLength || `Min ${minLength} characters`,
  email: v => !!v.match(/^\S+@\S+$/) || 'Must be a valid email address',
};

export default {
  name: 'RegistrationForm',
  data: () => ({
    valid: true,
    loading: false,
    name: '',
    nameRules: [rules.required],
    email: '',
    emailRules: [rules.required, rules.min(5), rules.email],
    password: '',
    passwordRules: [rules.required, rules.min(8)],
    showPassword: false,
  }),
  methods: {
    async submit() {
      // The registration forum must be valid before it can be submitted.
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;

      const { name, email, password } = this;
      try {
        await store.dispatch('register', {
          name, email, password,
        });
      } catch (error) {
        /*
         * Encountered an error during login, so show a snackbar containing the
         * error message.
         */
        let message = 'An unknown error occurred.';
        switch (error.code) {
          case 'auth/email-already-in-use': {
            message = 'A user already exists with the given email address. ' +
              'You may already have an account.';
            break;
          }
          case 'auth/invalid-email': {
            message = 'Must be a valid email address.';
            break;
          }
          case 'auth/operation-not-allowed': {
            // This only happens when email logins are disabled in Firebase.
            message = 'Something went wrong on our end.';
            break;
          }
          case 'auth/weak-password': {
            message = 'Your password is too weak! Try making it longer or ' +
              'adding special characters.';
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
