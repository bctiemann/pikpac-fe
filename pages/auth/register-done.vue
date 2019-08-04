<template>
  <b-card
    title="Register"
    class="mb-2"
  >
    <b-card-body>
      <p class="text-xs-center grey--text text--darken-1">
        Registered. Check your email.
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
