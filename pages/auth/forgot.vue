<template>
  <b-card
    title="Forgot Password?"
    class="mb-2"
  >
    <b-card-body>
      <AuthForgotCard />
    </b-card-body>
  </b-card>
</template>

<script>
import AuthForgotCard from '~/components/auth/AuthForgotCard.vue';

export default {
  layout: 'auth',
  components: {
    AuthForgotCard
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
