<template>
  <div id="login">
    <app-bar navigation="false" conversion="false" />

    <v-row justify="center">
      <v-col xs="12" sm="10" md="8" lg="6">
        <v-card outlined :loading="loading">
          <!-- Redirect notice -->
          <v-list-item
            v-if="redirectUrl"
            two-line
            class="px-8 red accent-4"
          >
            <v-list-item-content class="my-4">
              <div class="overline mb-4 white--text font-weight-black">
                UNAUTHORISED
              </div>

              <v-list-item-title class="headline mb-1 white--text">
                Hold up!
              </v-list-item-title>

              <v-list-item-subtitle class="white--text font-weight-medium">
                You need to login before you can do that.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <!-- Header -->
          <v-list-item two-line class="px-8 mb-2">
            <v-list-item-content>
              <v-list-item-title class="headline my-3">
                Welcome to Quartz CP
              </v-list-item-title>

              <v-list-item-subtitle class="subtitle">
                Enter your account details below to login, or register a new
                account with us.
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-icon size="80" color="primary">mdi-shield-account</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider />

          <!-- Login and registration forms -->
          <div class="mx-8 mt-8 mb-4">
            <v-progress-circular
              v-if="loading"
              indeterminate
              size="48"
              color="primary"
              class="mx-auto d-block mb-8"
            />
            <login-form
              v-else-if="page === 'login'"
              @change-page="changePage"
              @show-snackbar="showSnackbar"
            />
            <registration-form
              v-else
              @change-page="changePage"
              @show-snackbar="showSnackbar"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Error message snackbar -->
    <v-snackbar v-model="snackbar.model" timeout="6000">
      {{ snackbar.text }}

      <v-btn color="error" text @click="snackbar.model = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppBar from '@/components/common/AppBar';
import { LoginForm, RegistrationForm } from '@/components/auth';

export default {
  name: 'Login',
  components: {
    AppBar,
    LoginForm,
    RegistrationForm,
  },
  data: () => ({
    loading: true,
    page: 'login',
    snackbar: {
      model: false,
      text: '',
    },
  }),
  computed: {
    ...mapState(['loggedIn']),
    /**
     * Get the path to redirect to from the 'redirectUrl' query property.
     *
     * This property is set when we want to navigate to a page other than the
     * account dashboard after signing in, for example to complete a checkout.
     *
     * @returns {String|undefined} The path to navigate to after signing in.
     */
    redirectUrl() {
      return this.$route.query.redirectUrl;
    },
  },
  watch: {
    /**
     * If the loggedIn property is true then the user has already signed in to
     * the app. If a redirectUrl has been provided in the route params we will
     * navigate to it.
     *
     * @param value The new loggedIn property value.
     */
    loggedIn: {
      immediate: true,
      handler(value) {
        if (value === null) {
          // State not determined.
          return;
        }

        if (!value) {
          // The user hasn't signed in.
          this.loading = false;
          return;
        }

        // TODO: change default route to panel home
        this.$router.replace(this.redirectUrl || '/');
      },
    },
  },
  methods: {
    /**
     * Change between the login and registration forms.
     *
     * @param {'login'|'register'} page The name of the page to switch to.
     */
    changePage(page) {
      this.page = page;
    },
    /**
     * Display and populate a snackbar.
     *
     * @param {String} text The text to display in the snackbar.
     */
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.model = true;
    },
  },
};
</script>
