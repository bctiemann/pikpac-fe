<template>
  <b-card
    title="Password reset token sent"
    class="mb-2"
  >
    <b-card-body>
      <p class="text-xs-center grey--text text--darken-1">
        A password reset token has been sent to you. Check your email.
      </p>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </b-card-body>
  </b-card>
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
