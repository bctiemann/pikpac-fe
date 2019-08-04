<template>
  <div class="container">
    <h1>Cart</h1>
    <b-row v-for="item in cart" :key="item.id">
      {{ item }}
    </b-row>
  </div>
</template>

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
