<template>
  <div class="container">
    <h1>Products</h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-breadcrumb :items="productBreadcrumbs" />
    <b-row>
      <b-col v-for="product in products" :key="product.name" @click="selectProduct(product, true)">
        <b-img :src="product.image" fluid :alt="product.verboseName" />
        {{ product.verboseName }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
const rigidBoxImageUrl = require('~/static/rigid_box.png');
const foldingBoxImageUrl = require('~/static/folding_box.png');

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      products: [
        { name: 'rigid',
          verboseName: 'Rigid box',
          image: rigidBoxImageUrl,
          styles: []
        },
        { name: 'folding',
          verboseName: 'Folding box',
          image: foldingBoxImageUrl,
          styles: []
        }
      ],
      productBreadcrumbs: []
    };
  },

  computed: {
    productBreadcrumbs1: {
      get () {
        return [];
      }
    }
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    },

    selectProduct (item, resetBreadcrumbs) {
      console.log(item);
      if (resetBreadcrumbs) {
        this.productBreadcrumbs = [];
      };
      this.productBreadcrumbs.push(item.verboseName);
    }
  }

};
</script>
