<template>
  <div class="checkout-sidebar">
    <b-row>
      <b-col>
        <h3>Order summary</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>Subtotal</b-col>
      <b-col>{{ subtotal | currency }}</b-col>
    </b-row>
    <b-row>
      <b-col>Shipping</b-col>
      <b-col>{{ shipping | currency }}</b-col>
    </b-row>
    <b-row>
      <b-col>Tax</b-col>
      <b-col>{{ tax | currency }}</b-col>
    </b-row>
    <b-row>
      <b-col>Total</b-col>
      <b-col>{{ total | currency }}</b-col>
    </b-row>
  </div>
</template>

<style>
</style>

<script>
export default {
  props: {
    subtotal: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>
