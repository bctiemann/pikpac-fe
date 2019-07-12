<template>
  <div class="container">
    <h1 v-if="selectedStyle">
      {{ selectedStyle.verboseName }}
    </h1>
    <h1 v-else-if="selectedProduct">
      {{ selectedProduct.verboseName }}
    </h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-breadcrumb :items="productBreadcrumbs" />
    <b-row v-if="selectedStyle">
      <b-col sm="7">
        <b-img :src="selectedStyle.image" fluid :alt="selectedStyle.verboseName" class="mb-5" />
        <b-img :src="selectedStyle.image" fluid :alt="selectedStyle.verboseName" />
      </b-col>
      <b-col>
        blah details
      </b-col>
    </b-row>
    <b-row v-else-if="selectedProduct">
      <div v-for="style in selectedProduct.styles" :key="style.name" class="w-50 p-3" @click="selectStyle(style)">
        <b-img :src="style.image" fluid :alt="style.verboseName" />
        {{ style.verboseName }}
      </div>
    </b-row>
  </div>
</template>

<script>
import products from '~/constants/products.js';

const productBreadcrumbBase = { text: 'Products', to: '/design' };

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      products: products,
      productsDict: {},
      selectedProduct: null,
      selectedStyle: null,
      productBreadcrumbs: [ productBreadcrumbBase ]
    };
  },

  computed: {
    productBreadcrumbs1: {
      get () {
        return [];
      }
    }
  },

  created () {
    for (const p in this.products) {
      this.productsDict[this.products[p].name] = this.products[p];
    };
    console.log(this.productsDict);
  },

  mounted () {
    console.log(this.$route.params.product);
    this.selectedProduct = this.productsDict[this.$route.params.product];
    console.log(this.selectedProduct);
    this.fillBreadcrumbs();
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    },

    fillBreadcrumbs () {
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push({ text: this.selectedProduct.verboseName, href: '/design/' + this.selectedProduct.name });
    },

    selectProduct (product) {
      console.log(product);
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push({ text: product.verboseName, href: '/design?product=' + product.name });
      this.selectedProduct = product;
    },

    clearProduct () {
      console.log('foo');
    },

    selectStyle (style) {
      // this.productBreadcrumbs = [ productBreadcrumbBase ];
      // this.productBreadcrumbs.push({ text: this.selectedProduct.verboseName, href: '/design?product=' + this.selectedProduct.name });
      this.productBreadcrumbs.push(style.verboseName);
      this.selectedStyle = style;
    }
  }

};
</script>
