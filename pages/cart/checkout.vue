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
            <form autocomplete="off" @submit.stop.prevent="handleSubmit">
              <div id="card-element-bak" />
              <Card
                class="form-control"
                :stripe="stripePublicKey"
              />
              <b-btn type="submit" class="btn btn-primary btn-block mt-3">
                Place Order
              </b-btn>
            </form>
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
import { mapState, mapActions } from 'vuex';
import { Card, createToken } from 'vue-stripe-elements-plus';

export default {
  components: {
    Card
  },

  data: () => {
    return {
      tabIndex: 1,
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      stripePublicKey: process.env.NUXT_ENV_STRIPE_PUBLIC_KEY
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

  mounted () {
    console.log(process.env.NUXT_ENV_API_ROOT);
    console.log(process.env.NUXT_ENV_STRIPE_PUBLIC_KEY);
    // const elements = this.$stripe.import().elements();
    // const card = elements.create('card');
    // Add an instance of the card Element into the `card-element` <div>
    // card.mount('#card-element');
  },

  methods: {
    ...mapActions('cart', [
      'chargeCard'
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
    },

    async handleSubmit() {
      this.loading = true;
      let token;
      try {
        const response = await createToken();
        token = response.token.id;
        console.log(token);
      } catch (err) {
        alert('An error occurred.');
        console.log(err);
        this.loading = false;
        return;
      }
      try {
        this.chargeCard({ token: token });
        /*
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        });
        alert('Your order have been successfully submitted.');
        // this.emptyCart();
        this.$router.push('/');
        */
      } catch (err) {
        this.loading = false;
        alert('An error occurred.');
      }
    }
  }

};
</script>
