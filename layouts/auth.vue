<template>
  <b-container>
    <ul class="nav nav-pills nav-fill">
      <nuxt-link class="logo" to="/">
        pikpac
      </nuxt-link>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/design" data-toggle="pill">
          Design a box
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/how-it-works" data-toggle="pill">
          How it works
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/faq" data-toggle="pill">
          FAQ
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/account" data-toggle="pill">
          My account
        </nuxt-link>
      </li>
      <li v-if="user" class="nav-item">
        <a class="nav-link" href="#"><font-awesome-icon icon="shopping-basket" /></a>
      </li>
      <li v-if="user" class="nav-item">
        <nuxt-link class="nav-link" to="/auth/sign-out">
          <font-awesome-icon icon="sign-out-alt" />
        </nuxt-link>
      </li>
    </ul>
    <b-row row align-center justify-center>
      <b-col />
      <b-col sm="6">
        <nuxt />
      </b-col>
      <b-col />
    </b-row>
    <!--<PrimarySnackbar />-->
  </b-container>
</template>

<style>
</style>

<script>
// import PrimarySnackbar from '~/components/PrimarySnackbar.vue';

export default {
  components: {
    // PrimarySnackbar
  },

  computed: {
    user: {
      get () {
        return this.$auth.user;
      }
    }
  }
};
</script>
