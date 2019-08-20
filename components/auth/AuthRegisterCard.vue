<template>
  <b-container>
    {{ error }}
    <b-form class="register-form" @submit.prevent="register">
      <b-form-group
        id="email-formgroup"
        label="Enter your email"
        label-for="email"
        :state="emailState"
        :invalid-feedback="invalidFeedbackEmail"
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
        />
      </b-form-group>

      <b-form-group
        id="password-formgroup"
        label="Password"
        label-for="password"
        :state="passwordState"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
        />
      </b-form-group>

      <b-form-group
        id="password2-formgroup"
        label="Password (repeat)"
        label-for="password2"
        :state="passwordState"
      >
        <b-form-input
          id="password2"
          v-model="password2"
          type="password"
        />
      </b-form-group>

      <b-btn
        block
        color="success"
        type="submit"
        :disabled="!formValid"
      >
        Register
      </b-btn>
    </b-form>
    <nuxt-link to="/auth/sign-in">
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
      error: null,
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },

  computed: {
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
      return this.emailState === true ? 'Thank you' : '';
    },

    passwordState () {
      return true;
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
      return this.emailState && this.passwordsMatchError.length === 0 && this.password2.length > 0;
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
