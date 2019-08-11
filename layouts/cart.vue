<template>
  <b-container>
    <Navbar />
    <b-container>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Tab 1" active>
            <b-card-text>Tab Contents 1</b-card-text>
          </b-tab>
          <b-tab title="Tab 2">
            <b-card-text>Tab Contents 2</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <nuxt />
    </b-container>
  </b-container>
</template>

<style>
.nav-tabs .nav-link.active,
.nav-tabs .show > .nav-link,
.nav-link.nuxt-link-active,
.nav-link.nuxt-link-exact-active {
  color: #000;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 400;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  border-color: #dee2e6 #dee2e6 rgb(248, 250, 245);
}
</style>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// import { validationRules, validationParams } from '~/mixins/Validation';
import Navbar from '~/components/Navbar.vue';

export default {
  components: {
    Navbar
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
