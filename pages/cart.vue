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
            <li>{{ item.calculatedUnitPrice }} &times; {{ item.quantity }} = {{ item.calculatedTotalPrice }}</li>
          </ul>
        </div>
      </div>
    </b-row>
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
    ])
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
