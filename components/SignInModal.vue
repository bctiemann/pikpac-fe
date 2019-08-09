<template>
  <b-modal id="sign-in" title="Sign In" @ok.prevent="handleOk">
    <AuthSignInCard :login-action="loginAction" />
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';
import AuthSignInCard from '~/components/auth/AuthSignInCard.vue';
// import auth from '~/static/js/auth';

export default {
  components: {
    AuthSignInCard
  },

  props: {
    loginAction: {
      type: Function,
      default: () => null
    }
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },

  computed: {
    ...mapState('cart', [
      'cart'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    },

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
    }
  },

  methods: {
    async handleOk () {
      console.log('foo2');
      console.log(this.email);
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
        // this.$router.push('/account/orders');
      } catch (e) {
        console.log('caught error');
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
