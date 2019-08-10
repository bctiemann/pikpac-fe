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
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/cart">
          <font-awesome-icon icon="shopping-basket" />
          {{ cart.length }}
        </nuxt-link>
      </li>
      <li v-if="user" class="nav-item">
        <nuxt-link class="nav-link" to="/auth/sign-out">
          <font-awesome-icon icon="sign-out-alt" />
        </nuxt-link>
      </li>
    </ul>
  </b-container>
</template>

<style>
a {
  color: #000;
}
/* nav-link nuxt-link-exact-active nuxt-link-active active show */

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link,
.nav-link.nuxt-link-active,
.nav-link.nuxt-link-exact-active {
  color: #000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;
}
</style>

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
