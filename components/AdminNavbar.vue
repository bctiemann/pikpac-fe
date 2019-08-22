<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-toggle target="nav-text-collapse" />

    <b-navbar-brand>pikpac</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav v-if="user && user.is_admin">
        <b-nav-text>Administration</b-nav-text>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">
            EN
          </b-dropdown-item>
          <b-dropdown-item href="#">
            ES
          </b-dropdown-item>
          <b-dropdown-item href="#">
            RU
          </b-dropdown-item>
          <b-dropdown-item href="#">
            FA
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">
            Profile
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
