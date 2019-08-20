<template>
  <div class="container">
    <b-row class="designer">
      <b-col sm="9">
        <div class="h-100 d-flex flex-column">
          <h3>Design editor</h3>
          <b-row class="preview-pane h-100 mr-3 flex-grow-1">
            Preview
          </b-row>
        </div>
      </b-col>
      <b-col sm="3" class="designer-tools">
        <div class="h-100 d-flex flex-column">
          <b-row class="designer-title">
            <EditableTitle :content="project.title" @update="text = $event" />
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
        <b-button @click="createProjectAndPush">
          Review order &rarr;
        </b-button>
      </div>
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
import EditableTitle from '~/components/EditableTitle.vue';

export default {
  components: {
    EditableTitle
  },

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

    ...mapState('projects', [
      'project'
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

    ...mapMutations('projects', [
      'setProject'
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
    },

    createProjectAndPush () {
      /*
      const project = {
        title: this.product.name,
        product: this.product,
        design: this.design
      };
      */
      // this.setProject(this.project);
      // await this.createProject(project);
      console.log(this.project);
      this.$router.push(`/design/review`);
    }
  }
};
</script>
