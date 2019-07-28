<template>
  <div class="container">
    <div v-if="selectedPattern || selectedPaper">
      <b-row class="designer">
        <b-col sm="9">
          <b-row class="preview-pane h-100 mr-3">
            <h3>Design editor</h3>
          </b-row>
        </b-col>
        <b-col sm="3" class="designer-tools">
          <div class="h-100 d-flex flex-column">
            <b-row class="designer-title">
              <h2>{{ project.title }}</h2>
            </b-row>
            <b-row class="flex-grow-1">
              <b-col sm="8" class="px-1">
                <div class="h-100 d-flex flex-column">
                  <ul class="nav nav-tabs nav-fill">
                    <li class="nav-item">
                      Choose pattern
                    </li>
                    <li class="nav-item">
                      Choose paper
                    </li>
                  </ul>
                  <div class="flex-grow-1">
                    Palette
                  </div>
                </div>
              </b-col>
              <b-col sm="4">
                Buttons
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="d-flex w-100 justify-content-between">
        <div>
          <b-button to="/design">
            Back
          </b-button>
        </div>
        <div>
          <b-button>
            Save
          </b-button>
          <b-button @click="selectPatternPaper">
            Review order &rarr;
          </b-button>
        </div>
      </b-row>
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
      </b-row>
    </div>
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
import { mapState, mapGetters, mapActions } from 'vuex';

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
      this.selectedPattern = this.highlightedPattern;
      this.selectedPaper = this.highlightedPaper;
    }
  }
};
</script>
