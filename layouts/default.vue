<template>
  <div class="layout">
    <b-container>
      <Navbar />
      <nuxt />
    </b-container>
    <Footer />
  </div>
</template>

<style>
@font-face {
    font-family: 'mermaid';
    src: url('/fonts/Mermaid1001.ttf');
}

:root, body {
  font-family: 'Source Sans Pro';
  font-weight: 300;
  background-color: rgb(248, 250, 245);
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

h1, h2, h3, .logo, .navbar-brand {
  font-family: 'mermaid';
  font-weight: bold;
}
h1 {
  text-align: center;
  color: rgb(160, 165, 151);
}

.logo {
  font-size: 44px;
  color: #000;
}
.logo:hover {
  text-decoration: none;
  color: #000;
}

.project-data {
  border-bottom: 1px solid rgb(232, 219, 194);
  margin-bottom: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 400;
}
.under-divider {
  margin-top: -30px;
  font-size: 14px;
}
.group:after {
  content: "";
  display: table;
  clear: both;
}
</style>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// import { validationRules, validationParams } from '~/mixins/Validation';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import { getData, setData } from 'nuxt-storage/local-storage';
import { uuid } from 'vue-uuid';

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
  },

  created () {
    let clientFingerprint = getData('clientFingerprint');
    if (!clientFingerprint) {
      clientFingerprint = uuid.v4();
      setData('clientFingerprint', clientFingerprint, '365', 'd');
    }
    this.$axios.defaults.headers.common['Client-Fingerprint'] = clientFingerprint;
  }
};
</script>
