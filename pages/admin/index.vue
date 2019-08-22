<template>
  <div>
    Admin home
    <div v-for="order in orders" :key="order.id">
      {{ order.id }} {{ order.project.id }} {{ order.project.title }}
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'admin',
  middleware: ['auth', 'admin'],

  components: {},

  data: () => {
    return {
    };
  },

  computed: {
    ...mapState('admin', [
      'orders'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    }
  },

  mounted () {
    this.getOrders(false);
  },

  methods: {
    ...mapActions('admin', [
      'getOrders'
    ])
  }

};
</script>
