<template>
  <div class="container">
    My Orders
    <ul class="orders">
      <li v-for="order in orders" :key="order.id" @click="goToProject(order.project.id)">
        <div class="container">
          <b-row>
            <b-col sm="3">
              <b-img :src="order.project.product.picture" fluid :alt="order.project.product.name" />
            </b-col>
            <b-col>
              <h4>{{ order.project.title }}</h4>
              <p>{{ calculatedPrice(order.project.unit_price) }} &times; {{ order.project.quantity }} = {{ calculatedPrice(order.project.unit_price * order.project.quantity) }}</p>
              <p>{{ order.project.product.name }} {{ order.date_created }}</p>
            </b-col>
            <b-col sm="2">
              <b-btn @click.stop="showModalAndAddToCart(order.project)">
                Add to Cart
              </b-btn>
            </b-col>
          </b-row>
        </div>
      </li>
    </ul>
    <AddedToCartModal />
  </div>
</template>

<style>
.orders {
  list-style-type: none;
  padding: 0px;
}
.orders li {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}

/*
.orders li img {
  max-width: 120px;
  float: left;
}
.order-item-info {
  float: left;
}
*/
</style>

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
