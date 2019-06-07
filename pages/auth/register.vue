<template>
  <v-card class="auth-form-card" elevation="5">
    <v-responsive>
      <h1 class="display-2 text-uppercase font-weight-black">
        Drumline
      </h1>
    </v-responsive>

    <v-card-text>
      Register Account
      <v-form class="register-form" @submit.prevent="register">
        <v-text-field
          v-model="email"
          :error="hasError"
          outline
          label="Email"
        />

        <v-text-field
          v-model="password"
          :error="hasError"
          error-count="1"
          :error-messages="passwordsMatchError"
          outline
          type="password"
          label="Password"
        />

        <v-text-field
          v-model="password2"
          :error="hasError"
          error-count="1"
          :error-messages="passwordsMatchError"
          outline
          type="password"
          label="Repeat Password"
        />

        <v-btn
          block
          color="success"
          type="submit"
          :disabled="!formValid"
        >
          Register
        </v-btn>
      </v-form>
      <nuxt-link to="/">
        Back
      </nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  components: {
  },

  data () {
    return {
      email: '',
      password: '',
      password2: '',
      error: null
    };
  },

  computed: {
    hasError () { return !!this.error; },
    errorMessages () { return this.error ? [this.error] : []; },
    passwordsMatchError () {
      return (this.password === this.password2 || !this.password2) ? '' : 'Passwords must match.';
    },
    formValid () {
      return this.passwordsMatchError.length === 0 && this.password2.length > 0;
    }
  },

  methods: {
    async register () {
      // const { username, password } = this;
      try {
        await this.$axios.post('register/', {
          email: this.email,
          password: this.password
        })
          .then((response) => {
            console.log(response);
            this.$router.push('/auth/register-done/');
          })
          .catch((error) => {
            console.log('error');
            const errorList = JSON.parse(error.request.response);
            console.log(errorList);
            this.$store.commit('setSnackbar', {
              msg: errorList[0],
              color: 'error'
            }, { root: true });
          });
      } catch (e) {
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
