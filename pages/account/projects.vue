<template>
  <div class="container">
    <!--
    <b-button
      :pressed.sync="includeCancelled"
      variant="primary"
      @click="getOrders(includeCancelled)"
    >
      Include cancelled
    </b-button>
    -->
    <b-row>
      <div v-for="order in orders" :key="order.project.id" class="w-25 p-3" @click="goToProject(order.project)">
        <b-img :src="order.project.product.picture" fluid :alt="order.project.title" />
        {{ order.project.title }}
      </div>
    </b-row>
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

export default {
  layout: 'account',
  middleware: 'auth',

  components: {
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
    ]),

    ...mapState('cart', [
      'cart'
    ]),

    ...mapGetters('cart', [
      'projectIdsInCart'
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
