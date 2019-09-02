<template>
  <div v-if="chargeResult" class="container">
    <h1>Checkout complete</h1>
    <b-row>
      <b-col sm="6">
        <b-row v-for="item in chargeResult.cart_details" :key="item.id">
          <div class="cart-item">
            <b-img :src="item.product.picture" />
            <div class="cart-item-info">
              <ul>
                <li>{{ item.title }}</li>
                <li>{{ item.type }}</li>
                <li>{{ item.unitPrice | currency }}</li>
                <li>{{ item.unitPrice | currency }} &times; {{ item.quantity }} = {{ item.unitPrice * item.quantity | currency }}</li>
              </ul>
            </div>
          </div>
        </b-row>
        Total charged: {{ chargeResult.total_charged | currency }}
      </b-col>
      <b-col sm="2" />
      <b-col sm="4">
        <OrderSummary
          :subtotal="orderSummary.cartTotalPrice"
          :shipping="orderSummary.shipping"
          :tax="orderSummary.tax"
          :total="orderSummary.orderTotal"
        />
      </b-col>
    </b-row>
  </div>
  <div v-else class="container">
    Invalid access.
  </div>
</template>

<style>
.cart-item img {
  max-width: 120px;
  float: left;
}
.cart-item-info {
  float: left;
}
</style>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import OrderSummary from '~/components/OrderSummary.vue';

export default {
  components: {
    OrderSummary
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
    ...mapState('cart', [
      'cart',
      'chargeResult',
      'orderSummary'
    ]),

    ...mapGetters('cart', [
      'cartTotalPrice',
      'tax',
      'shipping',
      'orderTotal'
    ]),

    cartTotalPrice: {
      get () {
        let total = 0;
        for (const i in this.cart) {
          total += this.cart[i].quantity * Math.round(parseFloat(this.cart[i].unitPrice) * 100) / 100;
        };
        return total;
      }
    }
  },

  methods: {
    ...mapActions('cart', [
      'removeFromCart'
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

    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
