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
        <nuxt-link class="nav-link" to="/about" data-toggle="pill">
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
  </b-container>
</template>

<script>
export default {
  computed: {
    user: {
      get () {
        return this.$auth.user;
      }
    }
  }
};
</script>
