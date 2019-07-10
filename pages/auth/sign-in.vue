<template>
  <div class="">
    <h1 class="display-2 text-uppercase font-weight-black">
      Pikpac
    </h1>

    <v-card-text>
      <form class="sign-in-form" @submit.prevent="login">
        <template>
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="email">Email:</label>
              </b-col>
              <b-col sm="9">
                <!--<b-form-input :id="`type-${type}`" :type="type"></b-form-input>-->
                <b-form-input id="email" v-model="email" :error="hasError" outline label="Email" />
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="password">Password:</label>
              </b-col>
              <b-col sm="9">
                <!--<b-form-input :id="`type-${type}`" :type="type"></b-form-input>-->
                <b-form-input
                  id="password"
                  v-model="password"
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
      <v-layout row>
        <v-flex>
          <nuxt-link to="/auth/register/">
            Register
          </nuxt-link>
        </v-flex>
        <v-flex>
          <nuxt-link to="/auth/forgot/">
            <p class="text-xs-right">
              Forgot password?
            </p>
          </nuxt-link>
        </v-flex>
      </v-layout>
    </v-card-text>
  </div>
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
        this.$router.push('/');
      } catch (e) {
        console.log('caught error');
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
