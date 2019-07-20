<template>
  <div class="container">
    <h1>Products</h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-row v-if="isLoading">
      <b-col />
      <b-img src="~/static/loading_spinner.gif" />
      <b-col />
    </b-row>
    <b-row v-else>
      <b-col v-for="category in categories" :key="category.slug" @click="selectCategory(category)">
        <b-img :src="category.picture" fluid :alt="category.name" />
        {{ category.name }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapState('products', [
      'categories',
      'isLoading'
    ]),

    ...mapGetters('players', [
    ])
  },

  mounted () {
    console.log(this.products);
  },

  created () {
    this.getCategories();
  },

  methods: {
    ...mapActions('products', [
      'getCategories'
    ]),

    refreshPrice (item) {
      console.log('foo');
    },

    selectCategory (category) {
      this.$router.push({
        path: '/design/' + category.slug
      });
    },

    clearProduct () {
      console.log('foo');
    }
  }

};
</script>
