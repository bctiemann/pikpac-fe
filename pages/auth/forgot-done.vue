<template>
  <v-card
    class="auth-form-card"
    elevation="5"
  >
    <v-responsive>
      <h1 class="display-2 text-uppercase font-weight-black">
        Pikpac
      </h1>
    </v-responsive>

    <v-card-text>
      <p class="text-xs-center title grey--text text--darken-1">
        A password reset token has been sent to you. Check your email.
      </p>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',

  components: {
  },

  mounted () {
  },

  methods: {
  }
};
</script>
