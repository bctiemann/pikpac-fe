<template>
  <div class="container">
    <b-card no-body>
      <b-tabs v-model="tabIndex" card justified>
        <b-tab title="Shipping" active>
          <b-card-body>
            Tab Contents 1
            <b-btn @click="tabIndex = 1">
              Next
            </b-btn>
          </b-card-body>
        </b-tab>
        <b-tab title="Billing">
          <b-card-body>
            Tab Contents 2
            <b-btn @click="tabIndex = 2">
              Next
            </b-btn>
          </b-card-body>
        </b-tab>
        <b-tab title="Review">
          <b-card-body>
            Tab Contents 3
            <b-btn>
              Place Order
            </b-btn>
          </b-card-body>
        </b-tab>
      </b-tabs>
    </b-card>
    <nuxt />
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
      tabIndex: 1,
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
          console.log(this.cart[i].unit_price);
          total += this.cart[i].quantity * Math.round(parseFloat(this.cart[i].unit_price) * 100) / 100;
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
