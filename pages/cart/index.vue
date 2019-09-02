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
            <li>{{ item.unitPrice | currency }}</li>
            <li>{{ item.unitPrice | currency }} &times; {{ item.quantity }} = {{ item.unitPrice * item.quantity | currency }}</li>
          </ul>
          <b-btn @click="removeFromCart(item.id)">
            Remove
          </b-btn>
        </div>
      </div>
    </b-row>
    Total: {{ cartTotalPrice | currency }}
    <b-btn @click="startCheckout">
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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

    ...mapGetters('cart', [
      'cartTotalPrice'
    ])
  },

  methods: {
    ...mapActions('cart', [
      'removeFromCart'
    ]),

    ...mapMutations('cart', [
      'setTaxRate',
      'setShippingOption'
    ]),

    startCheckout () {
      this.$store.commit('cart/setTaxRate', 0);
      this.$store.commit('cart/setShippingOption', null);
      this.$router.push('/cart/checkout');
    }
  }

};
</script>
