<template>
  <div>
    Admin home
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth', 'admin'],

  components: {},

  data: () => {
    return {
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
  }

};
</script>
