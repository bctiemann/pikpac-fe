<template>
  <b-card
    title="Sign Out"
    class="mb-2"
  >
    <b-card-body>
      Signing out...
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  layout: 'auth',

  components: {},

  mounted() {
    if (this.$auth.loggedIn) {
      this.logout();
    } else {
      this.$router.push('/');
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
