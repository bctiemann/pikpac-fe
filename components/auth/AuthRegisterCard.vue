<template>
  <b-container>
    {{ error }}
    <b-form class="register-form" @submit.prevent="register">
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

      <b-form-input
        id="password2"
        v-model="password2"
        :state="null"
        :error="hasError"
        :error-count="errorMessages.length"
        :error-messages="errorMessages"
        outline
        type="password"
        label="Password"
      />

      <b-btn
        block
        color="success"
        type="submit"
        :disabled="!formValid"
      >
        Register
      </b-btn>
    </b-form>
    <nuxt-link to="/">
      Back
    </nuxt-link>
  </b-container>
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
    },
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
            this.error = errorList[0];
            // this.$store.commit('setSnackbar', {
            //   msg: errorList[0],
            //   color: 'error'
            // }, { root: true });
          });
      } catch (e) {
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
