<template>
  <v-card
    class="auth-form-card"
    elevation="5"
  >
    <v-responsive>
      <h1 class="display-2 text-uppercase font-weight-black">
        Drumline
      </h1>
    </v-responsive>

    <v-card-text>
      Forgot password?
      <v-form
        class="register-form"
        @submit.prevent="requestToken"
      >
        <v-text-field
          v-model="email"
          :error="hasError"
          outline
          label="Email"
        />

        <v-btn
          block
          color="success"
          type="submit"
        >
          Get reset token
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
    }
  },

  methods: {
    async requestToken () {
      // const { username, password } = this;
      try {
        await this.$axios.post('password_reset/', {
          email: this.email
        })
          .then((response) => {
            console.log(response);
            this.$router.push('/auth/forgot-done/');
          })
          .catch((error) => {
            console.log('error');
            const errorDict = JSON.parse(error.request.response);
            console.log(errorDict);
            this.$store.commit('setSnackbar', {
              msg: errorDict.email[0],
              color: 'error'
            }, { root: true });
          });
        // this.$router.push('/auth/register-done/');
      } catch (e) {
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
