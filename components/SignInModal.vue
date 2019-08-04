<template>
  <b-modal id="sign-in" title="Sign In">
    <p class="my-4">
      Please sign in.
    </p>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('cart', [
      'cart'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    }
  }
};
</script>
