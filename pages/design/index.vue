<template>
  <div class="container">
    <h1>Products</h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-row>
      <b-col v-for="product in products" :key="product.name" @click="selectProduct(product)">
        <b-img :src="product.image" fluid :alt="product.verboseName" />
        {{ product.verboseName }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { products } from '~/constants/products.js';

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      products: products
    };
  },

  computed: {
  },

  mounted () {
    console.log(this.products);
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    },

    selectProduct (product) {
      this.$router.push({
        path: '/design/' + product.name
      });
    },

    clearProduct () {
      console.log('foo');
    }
  }

};
</script>
