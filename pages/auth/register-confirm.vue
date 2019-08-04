<template>
  <b-card
    title="Confirm Account"
    class="mb-2"
  >
    <b-card-body>
      Confirm Account
      <b-form
        class="register-form"
        @submit.prevent="confirm"
      >
        Click below to confirm your account.
        <b-btn
          block
          color="success"
          type="submit"
        >
          Confirm
        </b-btn>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  layout: 'auth',
  components: {
  },

  data () {
    return {
      email: this.$nuxt._route.query.em,
      password: '',
      password2: '',
      error: null
    };
  },

  computed: {
    // email () '',
    hasError () { return !!this.error; },
    errorMessages () { return this.error ? [this.error] : []; }
  },

  created () {
    console.log(this.$nuxt._route.query);
  },

  methods: {
    async confirm () {
      // const { username, password } = this;
      try {
        await this.$axios.post('register/confirm/', {
          email: this.email,
          confirm_hashkey: this.$nuxt._route.query.hk
        })
          .then((response) => {
            console.log(response);
            this.$auth.loginWith('local', {
              data: {
                email: this.email,
                confirm_hashkey: this.$nuxt._route.query.hk
              }
            })
              .then((response) => {
                this.$router.push('/');
              })
              .catch((error) => {
                console.log('error');
                console.log(error.request);
              });
          })
          .catch((error) => {
            console.log('error1');
            const errorList = JSON.parse(error.request.response);
            console.log(errorList);
            this.$store.commit('setSnackbar', {
              msg: errorList[0],
              color: 'error'
            }, { root: true });
          });
        // this.$router.push('/auth/register-confirm-done/');
      } catch (e) {
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
