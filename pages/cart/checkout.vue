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
                sidebar
              </b-col>
            </b-row>
            <b-btn @click="tabIndex = 1">
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
                sidebar
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
                <h3>Order review</h3>
              </b-col>
              <b-col sm="2" />
              <b-col sm="4">
                sidebar
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

.stripe-element .form-control {
  padding-top: 10px;
}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import { CardNumber, CardExpiry, CardCvc, createToken } from 'vue-stripe-elements-plus';
import { isEqual } from 'lodash';

export default {
  components: {
    // Card,
    CardNumber,
    CardExpiry,
    CardCvc
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
      state: null
    };
  },

  computed: {
    ...mapState('cart', [
      'cart'
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    },

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

  watch: {
    number () { this.update(); },
    expiry () { this.update(); },
    cvc () { this.update(); },
    'billingAddress.full_name' () { this.update(); },
    'billingAddress.address_1' () { this.update(); },
    'billingAddress.city' () { this.update(); },
    'billingAddress.zip' () { this.update(); },
    'billingAddress.country' () { this.update(); }
  },

  mounted () {
    // const elements = this.$stripe.import().elements();
    // const card = elements.create('card');
    // Add an instance of the card Element into the `card-element` <div>
    // card.mount('#card-element');

    if (this.user.billing_address) {
      Object.assign(this.billingAddress, this.user.billing_address);
    }
  },

  methods: {
    ...mapActions('cart', [
      'chargeCard',
      'createAddress',
      'getToken',
      'createCard'
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
      if (this.tabIndex === 1) {
        this.formComplete = this.number &&
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

    async submitBillingInfo () {
      console.log(this.billingAddress);
      if (!(isEqual(this.billingAddress, this.user.billing_address))) {
        await this.createAddress({ address: this.billingAddress, type: 'billing' });
      }
      let token;
      let tokenData;
      try {
        const response = await createToken();
        token = response;
        console.log(token);
        tokenData = await this.getToken(token);
        console.log(tokenData);
      } catch (err) {
        alert('An error occurred.');
        console.log(err);
        this.loading = false;
        // return;
      }
      if (!this.user.default_card || this.user.default_card.fingerprint !== tokenData.card.fingerprint) {
        console.log('Creating new card');
        await this.createCard(token);
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
