<template>
  <div class="container">
    <h1>Products</h1>
    <p class="page-blurb">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
    </p>
    <b-breadcrumb :items="productBreadcrumbs" />
    <b-row v-if="selectedProduct">
      <div v-for="style in selectedProduct.styles" :key="style.name" class="w-50 p-3" @click="selectStyle(style)">
        <b-img :src="style.image" fluid :alt="style.verboseName" />
        {{ style.verboseName }}
      </div>
    </b-row>
    <b-row v-else>
      <b-col v-for="product in products" :key="product.name" @click="selectProduct(product)">
        <b-img :src="product.image" fluid :alt="product.verboseName" />
        {{ product.verboseName }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
const rigidBoxImageUrl = require('~/static/rigid_box.png');
const rigidBox2PieceNCImageUrl = require('~/static/rigid_2pc-nc.png');
const rigidBox2PieceCImageUrl = require('~/static/rigid_2pc-c.png');
const rigidBoxDrawerCImageUrl = require('~/static/rigid_drawer-c.png');
const foldingBoxImageUrl = require('~/static/folding_box.png');
const folding1PieceImageUrl = require('~/static/folding_1pc-folding.png');
const folding2PieceImageUrl = require('~/static/folding_2pc-folding.png');
const foldingDrawerImageUrl = require('~/static/folding_drawer-folding.png');
const productBreadcrumbBase = { text: 'Products', href: '/design' };

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      products: [
        {
          name: 'rigid',
          verboseName: 'Rigid box',
          image: rigidBoxImageUrl,
          styles: [
            {
              name: '2pc-nc',
              verboseName: 'Two piece box / Non-collapsible',
              image: rigidBox2PieceNCImageUrl
            },
            {
              name: '2pc-c',
              verboseName: 'Two piece box / Collapsible',
              image: rigidBox2PieceCImageUrl
            },
            {
              name: 'drawer-c',
              verboseName: 'Drawer box / Collapsible',
              image: rigidBoxDrawerCImageUrl
            }
          ]
        },
        {
          name: 'folding',
          verboseName: 'Folding box',
          image: foldingBoxImageUrl,
          styles: [
            {
              name: '1pc-folding',
              verboseName: 'One piece / Folding box',
              image: folding1PieceImageUrl
            },
            {
              name: '2pc-folding',
              verboseName: 'Two piece / Folding box',
              image: folding2PieceImageUrl
            },
            {
              name: 'drawer-folding',
              verboseName: 'Drawer / Folding box',
              image: foldingDrawerImageUrl
            }
          ]
        }
      ],
      selectedProduct: null,
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

  methods: {
    refreshPrice (item) {
      console.log('foo');
    },

    selectProduct (product) {
      console.log(product);
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push(product.verboseName);
      this.selectedProduct = product;
    },

    clearProduct () {
      console.log('foo');
    },

    selectStyle (style) {
      this.productBreadcrumbs = [ productBreadcrumbBase ];
      this.productBreadcrumbs.push(this.selectedProduct.verboseName);
      this.productBreadcrumbs.push(style.verboseName);
    }
  }

};
</script>
