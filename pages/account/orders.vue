<template>
  <div class="container">
    My Orders
    <ul>
      <li v-for="order in orders" :key="order.id">
        <p>{{ order.project.product.name }} {{ order.date_created }}</p>
        <b-img :src="order.project.product.picture" fluid :alt="order.project.product.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
    ...mapState('orders', [
      'orders',
      'isLoading'
    ])
  },

  created () {
    this.getOrders();
  },

  methods: {
    ...mapActions('orders', [
      'getOrders'
    ]),

    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
