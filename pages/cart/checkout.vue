<template>
  <div class="container">
    <b-card no-body>
      <b-tabs v-model="tabIndex" card justified>
        <b-tab title="Shipping" active>
          <b-card-body>
            <b-row>
              <b-col sm="6">
                <h3>Shipping address</h3>
                <b-form>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="fullName-formgroup"
                        label="Full name*"
                        label-for="full-name"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="full-name" v-model="shippingAddress.full_name" :state="null" :error="hasError" label="Full name" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="country-formgroup"
                        label="Country*"
                        label-for="country"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="country" v-model="shippingAddress.country" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="address1-formgroup"
                        label="Address line 1*"
                        label-for="shipping-address-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="shipping-address-1" v-model="shippingAddress.address_1" :state="null" :error="hasError" label="Billing address" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="address2-formgroup"
                        label="Address line 2"
                        label-for="shipping-address-2"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="shipping-address-2" v-model="shippingAddress.address_2" :state="null" :error="hasError" label="Billing address" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="city-formgroup"
                        label="City*"
                        label-for="city"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="city" v-model="shippingAddress.city" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        id="city-formgroup"
                        label="State*"
                        label-for="state"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="state" v-model="shippingAddress.state" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="zip-formgroup"
                        label="Zip code*"
                        label-for="zip"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="zip" v-model="shippingAddress.zip" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        id="phone-formgroup"
                        label="Local phone number"
                        label-for="phone"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="phone" v-model="shippingAddress.phone" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
              <b-col sm="2" />
              <b-col sm="4">
                <OrderSummary
                  :subtotal="cartTotalPrice"
                  :shipping="shipping"
                  :tax="tax"
                  :total="orderTotal"
                />
              </b-col>
            </b-row>
            <b-btn :disabled="!formComplete" @click="submitShippingInfo">
              Next
            </b-btn>
          </b-card-body>
        </b-tab>
        <b-tab title="Billing">
          <b-card-body>
            <b-row>
              <b-col sm="6">
                <h3>Billing information</h3>
                <b-form>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="fullName-formgroup"
                        label="Full name*"
                        label-for="full-name"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="full-name" v-model="billingAddress.full_name" :state="null" :error="hasError" label="Full name" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="cardNumber-formgroup"
                        label="Card number*"
                        label-for="cardNumber"
                      >
                        <card-number
                          ref="cardNumber"
                          class="stripe-element card-number"
                          :stripe="stripePublicKey"
                          :options="options"
                          @change="number = $event.complete"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="cardExpiry-formgroup"
                        label="Expiration date*"
                        label-for="cardExpiry"
                      >
                        <card-expiry
                          ref="cardExpiry"
                          class="stripe-element card-expiry"
                          :stripe="stripePublicKey"
                          :options="options"
                          @change="expiry = $event.complete"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        id="cardCvc-formgroup"
                        label="Security code*"
                        label-for="cardCvc"
                      >
                        <card-cvc
                          ref="cardCvc"
                          class="stripe-element card-cvc"
                          :stripe="stripePublicKey"
                          :options="options"
                          @change="cvc = $event.complete"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="billingAddress-formgroup"
                        label="Billing address*"
                        label-for="billing-address"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="billing-address" v-model="billingAddress.address_1" :state="null" :error="hasError" label="Billing address" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="city-formgroup"
                        label="City*"
                        label-for="city"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="city" v-model="billingAddress.city" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        id="zip-formgroup"
                        label="Zip code*"
                        label-for="zip"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="zip" v-model="billingAddress.zip" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        id="country-formgroup"
                        label="Country*"
                        label-for="country"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="country" v-model="billingAddress.country" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        id="phone-formgroup"
                        label="Local phone number"
                        label-for="phone"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="state"
                      >
                        <b-form-input id="phone" v-model="billingAddress.phone" :state="null" :error="hasError" label="City" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form>
                <b-btn :disabled="!formComplete" @click="submitBillingInfo">
                  Next
                </b-btn>
              </b-col>
              <b-col sm="2" />
              <b-col sm="4">
                <OrderSummary
                  :subtotal="cartTotalPrice"
                  :shipping="shipping"
                  :tax="tax"
                  :total="orderTotal"
                />
              </b-col>
            </b-row>
          </b-card-body>
        </b-tab>
        <b-tab title="Review">
          <b-card-body>
            <b-row>
              <b-col sm="6">
                <h3>Shipping address</h3>
                <ul class="address-summary">
                  <li>{{ shippingAddress.full_name }}</li>
                  <li>{{ shippingAddress.address_1 }}</li>
                  <li v-if="shippingAddress.address_2">
                    {{ shippingAddress.address_2 }}
                  </li>
                  <li>{{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.zip }}</li>
                  <li>{{ shippingAddress.country }}</li>
                </ul>

                <h3>Billing information</h3>
                <ul class="address-summary">
                  <li>{{ billingAddress.full_name }}</li>
                  <li v-if="user.default_card">
                    {{ user.default_card.brand }} {{ user.default_card.last_4 }} {{ user.default_card.exp_month }}/{{ user.default_card.exp_year }}
                  </li>
                </ul>

                <h3>Choose your shipping option</h3>
                <ul class="shipping-options">
                  <li
                    v-for="shippingOption in shippingOptions"
                    :key="shippingOption.id"
                    :class="{ 'selected': selectedShippingOption && shippingOption.id == selectedShippingOption.id }"
                    @click="setShippingOption(shippingOption)"
                  >
                    <b-row>
                      <b-col>
                        {{ shippingOption.name }}<br>
                        {{ shippingOption.business_days }} business days
                      </b-col>
                      <b-col>
                        {{ shippingOption.price | currency }}
                      </b-col>
                    </b-row>
                  </li>
                </ul>

                <h3>Order review</h3>
              </b-col>
              <b-col sm="2" />
              <b-col sm="4">
                <OrderSummary
                  :subtotal="cartTotalPrice"
                  :shipping="shipping"
                  :tax="tax"
                  :total="orderTotal"
                />
              </b-col>
            </b-row>
            <form autocomplete="off" @submit.stop.prevent="handleSubmit">
              <div id="card-element-bak" />
              <!--
              <Card
                class="form-control"
                :stripe="stripePublicKey"
              />
              -->
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

.shipping-options .selected {
  background-color: #ffe;
}

.stripe-element .form-control {
  padding-top: 10px;
}
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { CardNumber, CardExpiry, CardCvc, createToken } from 'vue-stripe-elements-plus';
import { isEqual } from 'lodash';
import OrderSummary from '~/components/OrderSummary.vue';

export default {
  components: {
    // Card,
    CardNumber,
    CardExpiry,
    CardCvc,
    OrderSummary
  },

  data: () => {
    return {
      tabIndex: 1,
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      stripePublicKey: process.env.NUXT_ENV_STRIPE_PUBLIC_KEY,
      loading: false,
      shippingAddress: {
        full_name: '',
        address_1: '',
        address_2: '',
        city: '',
        zip: '',
        country: '',
        phone: ''
      },
      billingAddress: {
        full_name: '',
        address_1: '',
        city: '',
        zip: '',
        country: '',
        phone: ''
      },
      formComplete: false,
      number: false,
      expiry: false,
      cvc: false,
      options: {
        style: {
          base: {
            // lineHeight: 10,
            fontFamily: 'Helvetica Neue, Helvetica',
            fontWeight: 400,
            color: '#495057',
            '::placeholder': {
              color: 'rgb(200, 200, 200)'
            }
          }
        },
        classes: {
          base: 'form-control'
        }
      },
      cardCvcVal: '123',
      hasError: false,
      validFeedback: null,
      invalidFeedback: null,
      state: null,
      orderSummary: {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
      },
      taxRate: 0,
      selectedShippingOption: null
    };
  },

  computed: {
    ...mapState('cart', [
      'cart',
      'shippingOptions',
      'chargeResult'
    ]),

    ...mapGetters('cart', [
      'cartTotalPrice',
      'tax',
      'shipping',
      'orderTotal'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    }

    /*
    cartTotalPrice1: {
      get () {
        let total = 0;
        for (const i in this.cart) {
          total += this.cart[i].quantity * Math.round(parseFloat(this.cart[i].unitPrice) * 100) / 100;
        };
        return total;
      }
    },

    shipping1: {
      get () {
        return this.selectedShippingOption ? parseFloat(this.selectedShippingOption.price) : 0;
      }
    },

    tax1: {
      get () {
        return (this.cartTotalPrice + this.shipping) * this.taxRate;
      }
    },

    orderTotal1: {
      get () {
        return this.cartTotalPrice + this.shipping + this.tax;
      }
    }
    */
  },

  watch: {
    tabIndex () { this.update(); },
    number () { this.update(); },
    expiry () { this.update(); },
    cvc () { this.update(); },
    'shippingAddress.full_name' () { this.update(); },
    'shippingAddress.country' () { this.update(); },
    'shippingAddress.address_1' () { this.update(); },
    'shippingAddress.city' () { this.update(); },
    'shippingAddress.state' () { this.update(); },
    'shippingAddress.zip' () { this.update(); },
    'billingAddress.full_name' () { this.update(); },
    'billingAddress.address_1' () { this.update(); },
    'billingAddress.city' () { this.update(); },
    'billingAddress.zip' () { this.update(); },
    'billingAddress.country' () { this.update(); }
  },

  async mounted () {
    // const elements = this.$stripe.import().elements();
    // const card = elements.create('card');
    // Add an instance of the card Element into the `card-element` <div>
    // card.mount('#card-element');

    if (this.user.billing_address) {
      Object.assign(this.billingAddress, this.user.billing_address);
    }
    await this.getShippingOptions();
  },

  methods: {
    ...mapActions('cart', [
      'chargeCard',
      'createAddress',
      'getToken',
      'createCard',
      'getShippingOptions',
      'getTaxRate'
    ]),

    ...mapMutations('cart', [
      'setTaxRate',
      'setShippingOption'
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

    update () {
      if (this.tabIndex === 0) {
        this.formComplete =
          this.shippingAddress.full_name &&
          this.shippingAddress.country &&
          this.shippingAddress.address_1 &&
          this.shippingAddress.city &&
          this.shippingAddress.state &&
          this.shippingAddress.zip;
      } else if (this.tabIndex === 1) {
        this.formComplete =
          this.number &&
          this.expiry &&
          this.cvc &&
          this.billingAddress.full_name &&
          this.billingAddress.address_1 &&
          this.billingAddress.city &&
          this.billingAddress.zip &&
          this.billingAddress.country;
      } else {
        this.formComplete = false;
      }

      // field completed, find field to focus next
      if (this.number) {
        if (!this.expiry) {
          this.$refs.cardExpiry.focus();
        } else if (!this.cvc) {
          this.$refs.cardCvc.focus();
        }
      } else if (this.expiry) {
        if (!this.cvc) {
          this.$refs.cardCvc.focus();
        } else if (!this.number) {
          this.$refs.cardNumber.focus();
        }
      }
      // no focus magic for the CVC field as it gets complete with three
      // numbers, but can also have four
    },

    setShippingOption (shippingOption) {
      this.selectedShippingOption = shippingOption;
      this.$store.commit('cart/setShippingOption', shippingOption);
    },

    async submitShippingInfo () {
      const taxRateData = await this.getTaxRate({ postalCode: this.shippingAddress.zip });
      this.taxRate = taxRateData.total_rate;
      this.$store.commit('cart/setTaxRate', taxRateData.total_rate);
      this.tabIndex = 1;
    },

    async submitBillingInfo () {
      console.log(this.billingAddress);
      if (!(isEqual(this.billingAddress, this.user.billing_address))) {
        await this.createAddress({ address: this.billingAddress, type: 'billing' });
      }

      let token;
      try {
        const response = await createToken();
        token = response;
        console.log(token);
        if (token.error) {
          alert('An error occurred.\n' + token.error.message);
          this.loading = false;
          return;
        }
      } catch (err) {
        alert('An error occurred. 2');
        this.loading = false;
        return;
      }

      let tokenData;
      try {
        tokenData = await this.getToken(token);
      } catch (err) {
        alert('An error occurred. 3');
        this.loading = false;
        return;
      }

      if (!this.user.default_card || this.user.default_card.fingerprint !== tokenData.card.fingerprint) {
        console.log('Creating new card');
        const cardResult = await this.createCard(token);
        if (cardResult.status === 'error') {
          alert('This card is invalid.');
          return;
        }
        // Refresh /me data with new card set as default
        this.$auth.fetchUser();
      } else {
        console.log('Using existing card');
      }

      // Now push to review page, and user action runs charge using this.user.default_card
      this.tabIndex = 2;
    },

    async handleSubmit() {
      this.loading = true;
      /*
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
      */
      try {
        await this.chargeCard({
          // token: token,
          total: this.orderTotal,
          cart: this.cart
        });

        if (this.chargeResult.error) {
          alert(this.chargeResult.error.message);
        } else {
          // Save order summary for display
          const orderSummary = {
            cartTotalPrice: this.cartTotalPrice,
            tax: this.tax,
            shipping: this.shipping,
            orderTotal: this.orderTotal
          };
          this.$store.commit('cart/setOrderSummary', orderSummary);

          // Empty cart
          this.$store.commit('cart/emptyCart');

          // Push to success page
          this.$router.push('/cart/success');
        }

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
