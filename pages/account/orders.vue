<template>
  <div class="container">
    My Orders
    <b-button
      :pressed.sync="includeCancelled"
      variant="primary"
      @click="getOrders(includeCancelled)"
    >
      Include cancelled
    </b-button>
    <ul class="orders">
      <li v-for="order in orders" :key="order.id" @click="goToProject(order.project)">
        <div class="container">
          <b-row>
            <b-col sm="3">
              <b-img :src="order.project.product.picture" fluid :alt="order.project.product.name" />
            </b-col>
            <b-col>
              <h4>{{ order.project.title }}</h4>
              <p>{{ calculatedPrice(order.project.unit_price) }} &times; {{ order.project.quantity }} = {{ calculatedPrice(order.project.unit_price * order.project.quantity) }}</p>
              <p>{{ order.project.product.name }}</p>
              <p>Type: {{ order.project.type_display }}</p>
              <p>Created: {{ order.date_created }}</p>
              <p>Status: {{ order.status }}</p>
            </b-col>
            <b-col sm="2">
              <b-btn v-if="!order.is_cancelled" @click.stop="showModalAndAddToCart(order.project)">
                Add to Cart
              </b-btn>
              <b-btn v-if="!order.is_cancelled" @click.stop="confirmAndCancelOrder(order.id)">
                Cancel Order
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
.orders p {
  margin: 3px;
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
import { mapState, mapActions, mapMutations } from 'vuex';
import AddedToCartModal from '~/components/AddedToCartModal.vue';

export default {
  layout: 'account',
  middleware: 'auth',

  components: {
    AddedToCartModal
  },

  data: () => {
    return {
      includeCancelled: false,
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
    this.getOrders(this.includeCancelled);
  },

  methods: {
    ...mapActions('orders', [
      'getOrders',
      'cancelOrder'
    ]),

    ...mapActions('cart', [
      'addToCart'
    ]),

    ...mapActions('projects', [
      'getProject'
    ]),

    ...mapMutations('projects', [
      'setProject'
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

    confirmAndCancelOrder (orderId) {
      if (confirm('Are you sure?')) {
        this.cancelOrder({ orderId: orderId, includeCancelled: this.includeCancelled });
      }
    },

    showModalAndAddToCart (project) {
      this.$bvModal.show('added-to-cart');
      this.addToCart(project);
    },

    goToProject (project) {
      this.setProject(project);
      if (project.type === 'custom') {
        this.$router.push(`/design/custom/${project.id}`);
      } else if (project.type === 'template') {
        this.$router.push(`/design/editor/${project.id}`);
      }
    },

    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
