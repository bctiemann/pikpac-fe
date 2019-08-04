<template>
  <v-card class="auth-form-card" elevation="5">
    <v-responsive>
      <h1 class="display-2 text-uppercase font-weight-black">
        Pikpac
      </h1>
    </v-responsive>

    <v-card-text>
      Reset Password
      <div v-if="tokenResponsePending">
        Please wait...
      </div>
      <div v-else-if="!tokenIsValid">
        Token not valid.
      </div>
      <div v-else>
        <v-form class="register-form" @submit.prevent="resetPassword">
          Choose a new password.

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

          <v-btn block color="success" type="submit" :disabled="!formValid">
            Set New Password
          </v-btn>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  components: {},

  data() {
    return {
      tokenResponsePending: true,
      tokenIsValid: false,
      email: this.$nuxt._route.query.em,
      password: '',
      password2: '',
      error: null
    };
  },

  computed: {
    // email () '',
    hasError() {
      return !!this.error;
    },
    errorMessages() {
      return this.error ? [this.error] : [];
    },
    passwordsMatchError() {
      return this.password === this.password2 || !this.password2
        ? ''
        : 'Passwords must match.';
    },
    formValid() {
      return this.passwordsMatchError.length === 0 && this.password2.length > 0;
    }
  },

  created() {
    console.log(this.$nuxt._route.query);
    this.$axios
      .post('password_reset/check/', {
        token: this.$nuxt._route.query.tk
      })
      .then((response) => {
        console.log(response);
        this.tokenResponsePending = false;
        this.tokenIsValid = true;
      })
      .catch((error) => {
        console.log('got error');
        console.log('error');
        console.log(error.request);
        this.tokenResponsePending = false;
      });
  },

  methods: {
    async resetPassword() {
      // const { username, password } = this;
      try {
        await this.$axios
          .post('password_reset/confirm/', {
            token: this.$nuxt._route.query.tk,
            password: this.password
          })
          .then((response) => {
            console.log(response);
            // this.commit('setSelectedPiece', response.data);
            // commit('appendPart', response.data);
            this.$auth
              .loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .then((response) => {
                this.$router.push('/');
              })
              .catch((error) => {
                console.log('got error');
                console.log('error');
                console.log(error.request);
              });
          })
          .catch((error) => {
            console.log('error');
            console.log(error);
            console.log(error.request.response);
            const passwordErrors = JSON.parse(error.request.response).password;
            console.log(passwordErrors);
            this.$store.commit(
              'setSnackbar',
              {
                msg: passwordErrors[0],
                color: 'error'
              },
              { root: true }
            );
          });
        // this.$router.push('/auth/register-confirm-done/');
      } catch (e) {
        console.log(e);
        // this.error = e.response.data[0];
      }
    }
  }
};
</script>
