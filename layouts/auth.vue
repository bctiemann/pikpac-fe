<template>
  <div>
    <b-container>
      <Navbar />
      <b-row row align-center justify-center>
        <b-col />
        <b-col sm="6">
          <nuxt />
        </b-col>
        <b-col />
      </b-row>
      <!--<PrimarySnackbar />-->
    </b-container>
    <Footer />
  </div>
</template>

<style>
</style>

<script>
// import PrimarySnackbar from '~/components/PrimarySnackbar.vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    // PrimarySnackbar
    Navbar,
    Footer
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
