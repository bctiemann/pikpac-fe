<template>
  <b-container>
    <b-form
      class="register-form"
      @submit.prevent="requestToken"
    >
      <b-form-group
        id="email-formgroup"
        label="Email"
        label-for="email"
        :state="state"
      >
        <b-form-input
          v-model="email"
          :error="hasError"
          outline
          label="Email"
        />
      </b-form-group>

      <b-btn
        :disabled="!formValid"
        block
        color="success"
        type="submit"
      >
        Get reset token
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
      error: null
    };
  },

  computed: {
    hasError () { return !!this.error; },
    errorMessages () { return this.error ? [this.error] : []; },
    passwordsMatchError () {
      return (this.password === this.password2 || !this.password2) ? '' : 'Passwords must match.';
    },

    state() {
      return this.email.length >= 4;
    },

    invalidFeedbackEmail() {
      if (this.email.length > 4) {
        return '';
      } else if (this.email.length > 0) {
        return 'Enter at least 4 characters';
      } else {
        return 'Please enter something';
      }
    },
    validFeedbackEmail() {
      return this.state === true ? 'Thank you' : '';
    },

    formValid () {
      return !this.invalidFeedbackEmail;
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
