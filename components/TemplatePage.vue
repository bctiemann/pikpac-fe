<template>
  <div v-if="projectIsLoaded && isValidProject" class="container">
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
          <b-button @click="updateProject({ projectId: project.id, project: project })">
            Save
          </b-button>
          <b-button :disabled="!(highlightedPattern || highlightedPaper)" @click="selectPatternPaper">
            Next &rarr;
          </b-button>
        </div>
      </b-row>
    </b-row>
  </div>
  <div v-else-if="!projectIsLoaded" class="container">
    Loading...
  </div>
  <div v-else-if="!isValidProject" class="container">
    Invalid project
  </div>
</template>

<style>
.faded {
  filter: opacity(60%);
  transition: .3s;
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

    ...mapState('projects', [
      'project',
      'projectIsLoaded',
      'isValidProject'
    ]),

    ...mapGetters('players', [
    ])
  },

  async mounted () {
    console.log(this.products);
    await this.getPatterns();
    await this.getPapers();
    await this.getProject(this.$route.params.id);
  },

  created () {
    // this.getCategories();
  },

  methods: {
    ...mapActions('products', [
      'getPatterns',
      'getPapers'
    ]),

    ...mapActions('projects', [
      'getProject',
      'updateProject'
    ]),

    ...mapMutations('projects', [
      'setProjectProperty'
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

    async selectPatternPaper () {
      this.selectedPattern = this.highlightedPattern;
      this.selectedPaper = this.highlightedPaper;
      const updatedDesign = {};
      Object.assign(updatedDesign, this.project.design);
      updatedDesign.pattern = this.selectedPattern;
      updatedDesign.paper = this.selectedPaper;
      this.$store.commit('projects/setProjectProperty', { property: 'design', value: updatedDesign });
      await this.updateProject({ projectId: this.project.id, project: this.project });
      this.$router.push(`/design/editor/${this.project.id}`);
    }
  }
};
</script>
