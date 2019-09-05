<template>
  <div class="layout">
    <AdminNavbar />
    <b-container>
      <nuxt />
    </b-container>
    <Footer />
  </div>
</template>

<style>
</style>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// import { validationRules, validationParams } from '~/mixins/Validation';
import AdminNavbar from '~/components/AdminNavbar.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    AdminNavbar,
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
