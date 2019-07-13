<template>
  <div class="container">
    <h1 v-if="selectedProduct">
      {{ selectedProduct.name }}
    </h1>
    <h1 v-else-if="selectedCategory">
      {{ selectedCategory.name }}
    </h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-breadcrumb :items="productBreadcrumbs" />
    <div v-if="selectedProduct">
      <b-row>
        <b-col sm="7">
          <b-img :src="selectedProduct.picture" fluid-grow :alt="selectedProduct.name" class="mb-5" />
        </b-col>
        <b-col>
          <p class="page-blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
          </p>
          <b-form-select v-model="size" :options="sizeOptions" />
          <b-form-select v-model="colors" :options="colorsOptions" />
          <b-form-select v-model="finishing" :options="finishingOptions" />
          <b-form-select v-model="boxQuantity" :options="boxQuantityOptions" @change="refreshPrice({ product: selectedProduct, quantity: boxQuantity })" />
          <b-row>
            <b-col>
              Price
            </b-col>
            <b-col class="text-right">
              {{ boxPrice || '' }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="7">
          <b-img :src="blisterTrayImageUrl" fluid-grow :alt="selectedProduct.name" class="mb-5" />
        </b-col>
        <b-col>
          <h2>Blister Tray</h2>
          <p class="page-blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
          </p>
          <b-form-select v-model="blisterTrayQuantity" :options="blisterTrayQuantityOptions" />
          <b-row>
            <b-col>
              Price
            </b-col>
            <b-col class="text-right">
              {{ blisterTrayPrice || '' }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col>
          <h2>Specifications</h2>
          <b-row>
            <div class="specification-header">
              Material
            </div>
            <p>
              {{ material }}
            </p>
          </b-row>
          <b-row>
            <div class="specification-header">
              Material Color
            </div>
            <p>
              {{ materialColor }}
            </p>
          </b-row>
          <b-row>
            <div class="specification-header">
              Lamination
            </div>
            <p>
              {{ lamination }}
            </p>
          </b-row>
          <b-row>
            <div class="specification-header">
              Custom Printing
            </div>
            <p>
              {{ customPrinting }}
            </p>
          </b-row>
        </b-col>
        <b-col sm="7">
          <b-img :src="selectedProduct.picture" fluid :alt="selectedProduct.name" class="mb-5" />
        </b-col>
      </b-row>
      <b-row>
        <b-col />
        <b-col>
          <b-button>
            Select from our preset designs
          </b-button>
        </b-col>
        <b-col>
          <b-button>
            Upload your own design
          </b-button>
        </b-col>
        <b-col />
      </b-row>
      <b-row>
        <h2>Examples</h2>
      </b-row>
    </div>
    <b-row v-else>
      <div v-for="product in products" :key="product.sku" class="w-50 p-3" @click="selectProduct(product)">
        <b-img :src="product.picture" fluid :alt="product.name" />
        {{ product.name }}
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { blisterTrayImageUrl } from '~/constants/products.js';

const productBreadcrumbBase = { text: 'Products', to: '/design' };

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      // products: products,
      // productsDict: {},
      // selectedCategory: null,
      selectedProduct: null,
      productBreadcrumbs: [ productBreadcrumbBase ],
      blisterTrayImageUrl: blisterTrayImageUrl,
      size: null,
      sizeOptions: [
        { value: null, text: 'Select size' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      colors: null,
      colorsOptions: [
        { value: null, text: 'Select # of colors' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      finishing: null,
      finishingOptions: [
        { value: null, text: 'Select finishing' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      boxQuantity: null,
      boxQuantityOptions: [
        { value: null, text: 'Select quantity' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      blisterTrayQuantity: null,
      blisterTrayQuantityOptions: [
        { value: null, text: 'Select quantity' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      blisterTrayPrice: 7.21,
      material: '1.5mm Chipboard + 157 gsm Artboard',
      materialColor: 'White',
      lamination: 'Clear varnish / Exterior of the box',
      customPrinting: 'CMYK 4 color process print'
    };
  },

  computed: {
    ...mapState('products', [
      'selectedCategory',
      'products',
      'productsDict',
      'boxPrice',
      'isLoading'
    ]),

    ...mapGetters('players', [
    ]),

    productBreadcrumbs1: {
      get () {
        return [];
      }
    }
  },

  async created () {
    // await this.getProducts();
    await this.getCategory({ category: this.$route.params.category });
    this.fillBreadcrumbs();
    this.getProducts({ category: this.$route.params.category });

    // for (const p in this.products) {
    //   this.productsDict[this.products[p].name] = this.products[p];
    // };
    // console.log(this.productsDict);
  },

  mounted () {
    // console.log(this.$route.params.category);
    // this.selectedCategory = this.productsDict[this.$route.params.category];
    // console.log(this.selectedCategory);
  },

  methods: {
    ...mapActions('products', [
      'getCategory',
      'getProducts',
      'refreshPrice'
    ]),

    fillBreadcrumbs () {
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push({ text: this.selectedCategory.name, href: '/design/' + this.selectedCategory.slug });
    },

    /*
    selectProduct (product) {
      console.log(product);
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push({ text: product.verboseName, href: '/design?product=' + product.name });
      this.selectedProduct = product;
    },
    */

    clearProduct () {
      console.log('foo');
    },

    selectProduct (product) {
      // this.productBreadcrumbs = [ productBreadcrumbBase ];
      // this.productBreadcrumbs.push({ text: this.selectedProduct.verboseName, href: '/design?product=' + this.selectedProduct.name });
      this.productBreadcrumbs.push(product.name);
      this.selectedProduct = product;
      this.boxQuantityOptions = [{ value: null, text: 'Select quantity' }];
      for (const p in product.prices) {
        console.log(product.prices[p].quantity);
        this.boxQuantityOptions.push({ text: product.prices[p].quantity, value: product.prices[p].quantity });
      };
      // this.boxQuantity = product.prices[0].quantity;
      // this.refreshPrice({ product: product, quantity: this.boxQuantity });
    }
  }

};
</script>
