<template>
  <b-container>
    <template>
      <b-container fluid>
        <div
          v-if="error"
          class="login-error"
        >
          <h4>Error:</h4>
          <p class="error-text">
            {{ error }}
          </p>
        </div>
        <b-form class="sign-in-form" @submit.prevent="login(loginAction)">
          <b-form-group
            id="email-formgroup"
            label="Email"
            label-for="email"
            :state="emailState"
            :invalid-feedback="invalidFeedbackEmail"
          >
            <b-form-input
              id="email"
              v-model="email"
              :state="null"
              :error="hasError"
              label="Email"
            />
          </b-form-group>
          <b-form-group
            id="password-formgroup"
            label="Password"
            label-for="password"
            :state="state"
          >
            <b-form-input
              id="password"
              v-model="password"
              :state="null"
              :error="hasError"
              type="password"
              label="Password"
            />
          </b-form-group>
          <b-button :disabled="!formValid" block color="success" type="submit">
            Sign In
          </b-button>
          <b-form-checkbox
            v-model="rememberMe"
            class="remember-me-checkbox"
          >
            Remember me
          </b-form-checkbox>
        </b-form>
      </b-container>
      <b-row>
        <b-col>
          <nuxt-link to="/auth/register/">
            Register
          </nuxt-link>
        </b-col>
        <b-col>
          <nuxt-link to="/auth/forgot/">
            <p class="text-xs-right">
              Forgot password?
            </p>
          </nuxt-link>
        </b-col>
      </b-row>
    </template>
  </b-container>
</template>

<script>
// import auth from '~/static/js/auth';

export default {
  layout: 'auth',
  components: {},

  props: {
    loginAction: {
      type: Function,
      default: () => null
    }
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },

  computed: {
    rememberMe: {
      get() {
        const authSetToRemember = this.$auth.$storage.getCookie('remember_me');
        return /true/.test(authSetToRemember);
      },
      set(rememberMe) {
        this.$auth.options.cookie.options.expires = rememberMe
          ? 61 // Expire cookie in two calendar months;
          : null;
        this.$auth.$storage.setCookie('remember_me', rememberMe);
      }
    },

    emailState() {
      return this.email.length >= 4 && this.email.match(this.emailRegex) !== null;
    },

    invalidFeedbackEmail() {
      if (this.email.length < 4) {
        return '';
      } else if (!this.email.match(this.emailRegex)) {
        return 'Invalid email';
      } else if (this.email.length > 0) {
        return 'Enter at least 4 characters';
      } else {
        return 'Please enter something';
      }
    },
    validFeedbackEmail() {
      return this.state === true ? 'Thank you' : '';
    },

    invalidFeedbackPassword() {
      if (this.password.length > 4) {
        return '';
      } else if (this.password.length > 0) {
        return 'Enter at least 4 characters';
      } else {
        return 'Please enter something';
      }
    },
    validFeedbackPassword() {
      return this.state === true ? 'Thank you' : '';
    },

    hasError() {
      return !!this.error;
    },
    errorMessages() {
      return this.error ? [this.error] : [];
    },

    formValid () {
      return this.emailState && !this.invalidFeedbackPassword;
    }
  },

  methods: {
    // redirectToAccountPage () {
    //   console.log('redirecting');
    //   this.$router.push('/account/orders');
    // },

    // closeModal () {
    //   console.log('closing modal');
    //   this.$bvModal.hide('sign-in');
    // },

    async login (callback) {
      console.log('foo1a');
      // const { username, password } = this;
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .catch((error) => {
            console.log('error');
            console.log(error.request);
            this.error = JSON.parse(error.request.response)[0];
          });
        callback();
        // this.$router.push('/account/orders');
      } catch (e) {
        console.log('caught error');
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
