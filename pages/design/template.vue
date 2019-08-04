<template>
  <div class="container">
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
      <h3>Pattern options</h3>
      <b-row>
        <div v-for="pattern in patterns" :key="pattern.sku" class="w-25 p-3" :class="{ faded: (highlightedPattern || highlightedPaper) && pattern !== highlightedPattern }" @click="highlightPattern(pattern)">
          <b-img :src="pattern.picture" fluid :alt="pattern.name" />
          {{ pattern.name }}
        </div>
      </b-row>
      <h3>Paper options</h3>
      <b-row>
        <div v-for="paper in papers" :key="paper.sku" class="w-25 p-3" :class="{ faded: (highlightedPattern || highlightedPaper) && paper !== highlightedPaper }" @click="highlightPaper(paper)">
          <b-img :src="paper.picture" fluid :alt="paper.name" />
          {{ paper.name }}
        </div>
      </b-row>
      <b-row class="d-flex w-100 justify-content-between">
        <div>
          <b-button to="/design">
            Choose another box
          </b-button>
        </div>
        <div>
          <b-button>
            Save
          </b-button>
          <b-button :disabled="!(highlightedPattern || highlightedPaper)" @click="selectPatternPaper">
            Next &rarr;
          </b-button>
        </div>
      </b-row>
    </b-row>
  </div>
</template>

<style>
.faded {
  filter: opacity(60%);
  transition: .3s;
}

.designer {
  height: 80vh;
}

.preview-pane {
  background-color: #e0e4df;
}

.designer-tools {
}

.designer-tools div {
  background-color: #e0e4df;
}

.designer-title {
  height: 60px;
}

.designer-tools .nav {
  font-size: 10px;
}
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      project: {
        title: 'Project name'
      },
      selectedPattern: null,
      selectedPaper: null,
      highlightedPattern: null,
      highlightedPaper: null
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

    ...mapActions('design', [
      'setDesignProperty'
    ]),

    ...mapMutations('design', [
    ]),

    highlightPattern (pattern) {
      this.highlightedPattern = pattern;
      this.highlightedPaper = null;
      console.log(pattern);
    },

    highlightPaper (paper) {
      this.highlightedPattern = null;
      this.highlightedPaper = paper;
      console.log(paper);
    },

    selectPatternPaper () {
      // this.selectedPattern = this.highlightedPattern;
      // this.selectedPaper = this.highlightedPaper;
      this.setDesignProperty({ property: 'pattern', value: this.highlightedPattern });
      this.setDesignProperty({ property: 'paper', value: this.highlightedPaper });
      this.$router.push('/design/editor');
    }
  }
};
</script>
