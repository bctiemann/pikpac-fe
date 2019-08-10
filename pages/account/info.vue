<template>
  <div class="container">
    Account Information
  </div>
</template>

<script>
export default {
  layout: 'account',
  middleware: 'auth',

  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ]
    };
  },

  computed: {
    user: {
      get () {
        return this.$auth.user;
      }
    }
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
