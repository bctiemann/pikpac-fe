<template>
  <div class="layout">
    <b-container>
      <Navbar />
      <h1>My Account</h1>
      <b-container>
        <b-nav pills fill class="accounts-nav">
          <b-nav-item to="/account/projects" :active="$nuxt.$route.path == '/account/projects'">
            Saved Projects
          </b-nav-item>
          <b-nav-item to="/account/history" :active="$nuxt.$route.path == '/account/history'">
            Order History
          </b-nav-item>
          <b-nav-item to="/account/info" :active="$nuxt.$route.path == '/account/info'">
            Account Information
          </b-nav-item>
        </b-nav>
        <nuxt />
      </b-container>
    </b-container>
    <Footer />
  </div>
</template>

<style>
.accounts-nav {
  justify-content: space-around;
  margin: 50px auto;
}

.accounts-nav .nav-item {
  flex: 0 1 auto;
}

.accounts-nav .nav-link {
  padding: 0.25rem 4rem;
}

.accounts-nav.nav-pills .nav-link {
  background-color: rgb(204, 204, 204);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
}

.accounts-nav.nav-pills .nav-link.active,
.accounts-nav.nav-pills .show > .nav-link,
.accounts-nav .nav-link.nuxt-link-active,
.accounts-nav .nav-link.nuxt-link-exact-active {
  background-color: rgb(232, 219, 194);
  color: rgb(114, 106, 97);
}
</style>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// import { validationRules, validationParams } from '~/mixins/Validation';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'attach_money',
          title: 'Price Check',
          to: '/price'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ThinkSmall'
    };
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
