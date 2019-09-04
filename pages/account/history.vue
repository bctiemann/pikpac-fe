<template>
  <div class="container">
    <b-button
      :pressed.sync="includeCancelled"
      variant="primary"
      @click="refreshOrders"
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
              <p>Created: {{ order.date_created | moment('MMM D, YYYY, H:mm a') }}</p>
              <p>Status: {{ order.status }}</p>
            </b-col>
            <b-col sm="3">
              <b-btn
                class="btn-block"
                @click.stop="viewOrderDetails(order.id)"
              >
                View order details
              </b-btn>
              <div
                v-if="projectInCart(order.project.id)"
                class="in-cart"
              >
                In cart
              </div>
              <b-btn
                v-if="!order.is_cancelled && !projectInCart(order.project.id)"
                class="btn-block"
                @click.stop="showModalAndAddToCart(order.project)"
              >
                Buy it again
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
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
      ],
      statuses: [
        'shipped',
        'production'
      ]
    };
  },

  computed: {
    ...mapState('orders', [
      'orders',
      'isLoading'
    ]),

    ...mapState('cart', [
      'cart'
    ]),

    ...mapGetters('cart', [
      'projectIdsInCart'
    ])
  },

  created () {
    this.refreshOrders();
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

    refreshOrders () {
      const statuses = [];
      Object.assign(statuses, this.statuses);
      if (this.includeCancelled) {
        statuses.push('cancelled');
      }
      this.getOrders({ statuses: statuses });
    },

    projectInCart (projectId) {
      return this.projectIdsInCart.indexOf(projectId) > -1;
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

    viewOrderDetails (orderId) {
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
