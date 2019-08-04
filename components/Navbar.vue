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
        <nuxt-link class="nav-link" to="/account/orders" data-toggle="pill">
          My account
        </nuxt-link>
      </li>
      <li v-if="user" class="nav-item">
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
