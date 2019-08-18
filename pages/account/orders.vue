<template>
  <div class="container">
    My Orders
    <ul>
      <li v-for="order in orders" :key="order.id">
        <p @click="goToProject(order.project.id)">
          {{ order.project.title }}
        </p>
        <b-btn @click="showModalAndAddToCart(order.project)">
          Add to Cart
        </b-btn>
        <p>{{ calculatedPrice(order.project.unit_price) }} &times; {{ order.project.quantity }} = {{ calculatedPrice(order.project.unit_price * order.project.quantity) }}</p>
        <p>{{ order.project.product.name }} {{ order.date_created }}</p>
        <b-img :src="order.project.product.picture" fluid :alt="order.project.product.name" />
      </li>
    </ul>
    <AddedToCartModal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddedToCartModal from '~/components/AddedToCartModal.vue';

export default {
  layout: 'account',
  middleware: 'auth',

  components: {
    AddedToCartModal
  },

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

    ...mapActions('cart', [
      'addToCart'
    ]),

    zeroPadPrice (value) {
      if (!value) {
        return 0;
      }
      return value.toLocaleString('en', { minimumIntegerDigits: 1, minimumFractionDigits: 2, useGrouping: false });
    },

    calculatedPrice (price) {
      return '$' + this.zeroPadPrice(price);
    },

    showModalAndAddToCart (project) {
      this.$bvModal.show('added-to-cart');
      this.addToCart(project);
    },

    goToProject (projectId) {
      this.$router.push(`/design/custom/${projectId}`);
    },

    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
