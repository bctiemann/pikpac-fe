<template>
  <div class="container">
    <h1>Cart</h1>
    <b-row v-for="item in cart" :key="item.id">
      <div class="cart-item">
        <b-img :src="item.product.picture" />
        <div class="cart-item-info">
          <ul>
            <li>{{ item.title }}</li>
            <li>{{ item.type }}</li>
            <li>{{ item.unitPrice }}</li>
            <li>{{ calculatedPrice(item.unitPrice) }} &times; {{ item.quantity }} = {{ calculatedPrice(item.unitPrice * item.quantity) }}</li>
          </ul>
        </div>
      </div>
    </b-row>
    Total: {{ calculatedPrice(cartTotalPrice) }}
    <b-btn to="/cart/checkout">
      Next
    </b-btn>
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
import { mapState } from 'vuex';

export default {
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
    ...mapState('cart', [
      'cart'
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
