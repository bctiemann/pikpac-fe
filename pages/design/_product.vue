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
    <div v-if="selectedStyle">
      <b-row>
        <b-col sm="7">
          <b-img :src="selectedStyle.image" fluid :alt="selectedStyle.verboseName" class="mb-5" />
        </b-col>
        <b-col>
          blah details
          <p class="page-blurb">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
          </p>
          <b-form-select v-model="size" :options="sizeOptions" />
          <b-form-select v-model="colors" :options="colorsOptions" />
          <b-form-select v-model="finishing" :options="finishingOptions" />
          <b-form-select v-model="boxQuantity" :options="boxQuantityOptions" />
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
          <b-img :src="blisterTrayImageUrl" fluid :alt="selectedStyle.verboseName" class="mb-5" />
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
          <b-img :src="selectedStyle.image" fluid :alt="selectedStyle.verboseName" class="mb-5" />
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
    <b-row v-else-if="selectedProduct">
      <div v-for="style in selectedProduct.styles" :key="style.name" class="w-50 p-3" @click="selectStyle(style)">
        <b-img :src="style.image" fluid :alt="style.verboseName" />
        {{ style.verboseName }}
      </div>
    </b-row>
  </div>
</template>

<script>
import { products, blisterTrayImageUrl } from '~/constants/products.js';

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
      boxPrice: 3.5,
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
