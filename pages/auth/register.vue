<template>
  <b-card
    title="Register"
    class="mb-2"
  >
    <b-card-body>
      <AuthRegisterCard />
    </b-card-body>
  </b-card>
</template>

<script>
import AuthRegisterCard from '~/components/auth/AuthRegisterCard.vue';

export default {
  layout: 'auth',
  components: {
    AuthRegisterCard
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
