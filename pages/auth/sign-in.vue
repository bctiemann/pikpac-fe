<template>
  <b-card
    title="Sign In"
    class="mb-2"
  >
    <b-card-body>
      <form class="sign-in-form" @submit.prevent="login">
        <template>
          <b-container fluid>
            <b-form-group
              id="email-formgroup"
              description="Enter email."
              label="Enter your email"
              label-for="email"
              :invalid-feedback="invalidFeedback"
              :valid-feedback="validFeedback"
              :state="state"
            >
              <b-form-input id="email" v-model="email" :state="null" :error="hasError" label="Email" />
            </b-form-group>
            <!--
            <b-row class="my-1">
              <b-col sm="3">
                <label for="email">Email:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="email" v-model="email" :state="null" :error="hasError" label="Email" />
              </b-col>
            </b-row>
            -->
            <b-row class="my-1">
              <b-col sm="3">
                <label for="password">Password:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  id="password"
                  v-model="password"
                  :state="null"
                  :error="hasError"
                  :error-count="errorMessages.length"
                  :error-messages="errorMessages"
                  outline
                  type="password"
                  label="Password"
                />
              </b-col>
            </b-row>
          </b-container>
        </template>

        <b-form-checkbox
          v-model="rememberMe"
          class="remember-me-checkbox"
        >
          Remember me
        </b-form-checkbox>

        <b-button block color="success" type="submit">
          Sign In
        </b-button>
      </form>
      <b-container>
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
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  layout: 'auth',
  components: {},

  data() {
    return {
      email: '',
      password: '',
      error: null
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

    state() {
      return this.email.length >= 4;
    },

    invalidFeedback() {
      if (this.email.length > 4) {
        return '';
      } else if (this.email.length > 0) {
        return 'Enter at least 4 characters';
      } else {
        return 'Please enter something';
      }
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : '';
    },

    hasError() {
      return !!this.error;
    },
    errorMessages() {
      return this.error ? [this.error] : [];
    }
  },

  methods: {
    async login() {
      console.log('foo');
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
            this.error = JSON.parse(error.request.response);
          });
        this.$router.push('/account/orders');
      } catch (e) {
        console.log('caught error');
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
