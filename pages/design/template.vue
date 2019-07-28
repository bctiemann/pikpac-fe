<template>
  <div class="container">
    <div v-if="selectedPattern || selectedPaper">
      <h2>Design editor</h2>
    </div>
    <div v-else>
      <h2>Choose a design or paper</h2>
      <p class="page-blurb">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
      </p>
      <b-row v-if="isLoading">
        <b-col />
        <b-img src="~/static/loading_spinner.gif" />
        <b-col />
      </b-row>
      <b-row v-else>
        <b-row v-if="isLoading" class="row">
          <b-col />
          <b-img src="~/static/loading_spinner.gif" />
          <b-col />
        </b-row>
        <b-row v-else>
          <h3>Pattern options</h3>
          <b-row>
            <div v-for="pattern in patterns" :key="pattern.sku" class="w-25 p-3" @click="highlightPattern(pattern)">
              <b-img :src="pattern.picture" fluid :alt="pattern.name" />
              {{ pattern.name }}
            </div>
          </b-row>
          <h3>Paper options</h3>
          <b-row>
            <div v-for="paper in papers" :key="paper.sku" class="w-25 p-3" @click="highlightPaper(paper)">
              <b-img :src="paper.picture" fluid :alt="paper.name" />
              {{ paper.name }}
            </div>
          </b-row>
        </b-row>
      </b-row>
    </div>
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
      products: products,
      selectedPattern: null,
      selectedPaper: null
    };
  },

  computed: {
    ...mapState('products', [
      'patterns',
      'papers',
      'isLoading'
    ]),

    ...mapState('design', [
      'design'
    ]),

    ...mapGetters('players', [
    ])
  },

  async mounted () {
    console.log(this.products);
    await this.getPatterns();
    await this.getPapers();
  },

  created () {
    // this.getCategories();
  },

  methods: {
    ...mapActions('products', [
      'getPatterns',
      'getPapers'
    ]),

    highlightPattern (pattern) {
      console.log(pattern);
    },

    highlightPaper (paper) {
      console.log(paper);
    }
  }

};
</script>
