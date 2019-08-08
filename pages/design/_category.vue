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
              <span v-if="isLoading" class="price-loading">
                <b-img src="~/static/loading_spinner.gif" />
              </span>
              <span v-else-if="boxQuantity">
                {{ calculatedUnitPrice }} &times; {{ boxQuantity }} = {{ calculatedTotalPrice }}
              </span>
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
          <b-button @click="savePreliminaryDesign('template')">
            Select from our preset designs
          </b-button>
        </b-col>
        <b-col>
          <b-button @click="savePreliminaryDesign('custom')">
            Upload your own design
          </b-button>
        </b-col>
        <b-col />
      </b-row>
      <b-row>
        <b-col sm="12">
          <h2>Examples</h2>
          <div class="parent">
            <div class="div1" />
            <div class="div2" />
            <div class="div3" />
            <div class="div4" />
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row v-else>
      <div v-if="isLoading" class="row">
        <b-col />
        <b-img src="~/static/loading_spinner.gif" />
        <b-col />
      </div>
      <div v-for="product in products" v-else :key="product.sku" class="w-50 p-3" @click="selectProduct(product)">
        <b-img :src="product.picture" fluid :alt="product.name" />
        {{ product.name }}
      </div>
    </b-row>
  </div>
</template>

<style>
.price-loading img {
  max-height: 20px;
}

.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  height: 1000px;
}

.div1 { grid-area: 1 / 1 / 7 / 8; background-image: url('~static/example01.png'); }
.div2 { grid-area: 1 / 8 / 8 / 13; background-image: url('~static/example02.png'); }
.div3 { grid-area: 8 / 7 / 13 / 13; background-image: url('~static/example03.png'); }
.div4 { grid-area: 7 / 1 / 12 / 7; background-image: url('~static/example04.png'); }

.parent div {
  background-size: cover;
}
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { blisterTrayImageUrl } from '~/constants/products.js';

const productBreadcrumbBase = { text: 'Products', to: '/design' };

export default {
  components: {},

  data: () => {
    return {
      designTypes: {
        template: 'Predefined Template',
        custom: 'Custom Design'
      },
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
        { value: '1x1', text: '1 x 1' },
        { value: '2x2', text: '2 x 2' },
        { value: '3x3', text: '3 x 3' },
        { value: '4x4', text: '4 x 4' },
        { value: '5x5', text: '5 x 5' }
      ],
      colors: null,
      colorsOptions: [
        { value: null, text: 'Select # of colors' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' }
      ],
      finishing: null,
      finishingOptions: [
        { value: null, text: 'Select finishing' },
        { value: 'a', text: 'First option' },
        { value: 'b', text: 'Second option' }
      ],
      boxQuantity: null,
      boxQuantityOptions: [],
      blisterTrayQuantity: null,
      blisterTrayQuantityOptions: [
        { value: null, text: 'Select quantity' },
        { value: 'a', text: 'First option' },
        { value: 'b', text: 'Second option' }
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

    ...mapState('design', [
      'design'
    ]),

    ...mapGetters('players', [
    ]),

    calculatedUnitPrice: {
      get () {
        return '$' + this.zeroPadPrice(this.boxPrice);
      }
    },

    calculatedTotalPrice: {
      get () {
        return '$' + this.zeroPadPrice(this.boxPrice * this.boxQuantity);
      }
    },

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

    ...mapMutations('design', [
      'setDesign'
    ]),

    zeroPadPrice (value) {
      if (!value) {
        return 0;
      }
      return value.toLocaleString('en', { minimumIntegerDigits: 1, minimumFractionDigits: 2, useGrouping: false });
    },

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
        this.boxQuantityOptions.push({ text: product.prices[p].quantity, value: product.prices[p].quantity });
      };
      // this.boxQuantity = product.prices[0].quantity;
      // this.refreshPrice({ product: product, quantity: this.boxQuantity });
    },

    savePreliminaryDesign (designType) {
      const design = {
        product: this.selectedProduct,
        title: 'Project name',
        type: this.designTypes[designType],
        quantity: this.boxQuantity,
        calculatedUnitPrice: this.calculatedUnitPrice,
        calculatedTotalPrice: this.calculatedTotalPrice
      };
      this.setDesign(design);
      this.$router.push({
        path: `/design/${designType}`
      });
    }
  }

};
</script>
