<template>
  <b-modal id="sign-in" title="Sign In" @ok="handleOk">
    <AuthSignInCard />
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
  computed: {
    ...mapState('cart', [
      'cart'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
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
