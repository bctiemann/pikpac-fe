<template>
  <b-modal id="sign-in" title="Sign In" @ok="handleOk">
    <b-form class="sign-in-form" @submit.prevent="handleOk">
      <AuthSignInCard />
    </b-form>
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
    handleOk () {
      // console.log(auth.login);
      console.log('blah');
    }
  }
};
</script>
