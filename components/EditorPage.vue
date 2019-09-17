<template>
  <div v-if="projectIsLoaded && isValidProject" class="container">
    <b-row class="designer">
      <b-col sm="8">
        <div class="h-100 d-flex flex-column">
          <h3>Design editor</h3>
          <b-row id="preview-pane" class="preview-pane h-100 mr-3 flex-grow-1 colored-box">
            <canvas id="canvas" />
          </b-row>
        </div>
      </b-col>
      <b-col sm="4" class="designer-tools pl-1">
        <div class="h-100 d-flex flex-column">
          <b-row class="designer-title colored-box mb-1 p-4">
            <EditableTitle :content="project.title" @update="text = $event" />
          </b-row>
          <b-row class="flex-grow-1">
            <b-col sm="9" class="px-0">
              <div class="h-100 d-flex flex-column pl-0">
                <div class="h-100 colored-box pr-0 mr-1">
                  <b-tabs v-if="selectedPalette === 'size'" content-class="mt-3" fill>
                    <b-tab title="Choose size">
                      Sizes
                    </b-tab>
                  </b-tabs>
                  <b-tabs v-else-if="selectedPalette === 'style'" content-class="mt-3" fill>
                    <b-tab title="Choose pattern">
                      <div class="scrolling-container">
                        <div v-for="pattern in patterns" :key="pattern.sku" class="p-3" :class="{ faded: (highlightedPattern || highlightedPaper) && pattern !== highlightedPattern }" @click="highlightPattern(pattern)">
                          <b-img :src="pattern.picture" fluid :alt="pattern.name" />
                          {{ pattern.name }}
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="Choose paper">
                      <div class="scrolling-container">
                        <div v-for="paper in papers" :key="paper.sku" class="p-3" :class="{ faded: (highlightedPattern || highlightedPaper) && paper !== highlightedPaper }" @click="highlightPaper(paper)">
                          <b-img :src="paper.picture" fluid :alt="paper.name" />
                          {{ paper.name }}
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                  <b-tabs v-else-if="selectedPalette === 'text'" content-class="mt-3" fill>
                    <b-tab title="Formatting">
                      <b-btn @click="placeNewElement">
                        Place Element
                      </b-btn>
                      Formatting
                    </b-tab>
                    <b-tab title="Typefaces">
                      Typefaces
                    </b-tab>
                    <b-tab title="Colors">
                      Colors
                    </b-tab>
                  </b-tabs>
                  <b-tabs v-else-if="selectedPalette === 'images'" content-class="mt-3" fill>
                    <b-tab title="Images">
                      Images
                    </b-tab>
                  </b-tabs>
                </div>
              </div>
            </b-col>
            <b-col sm="3" class="pl-0 pr-0">
              <ul class="palette-buttons">
                <li
                  v-for="button in paletteButtons"
                  :key="button.target"
                  :class="{ 'selected': selectedPalette === button.target }"
                  @click="selectPalette(button.target)"
                >
                  {{ button.label }}
                </li>
              </ul>
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
        <b-button @click="saveDesign">
          Save
        </b-button>
        <b-button @click="createProjectAndPush">
          Review order &rarr;
        </b-button>
      </div>
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

.designer {
  height: 80vh;
}

.colored-box {
  background-color: rgb(239, 239, 239);
}

.preview-pane {
}

.designer-tools {
}

.designer-tools div {
}

.designer-title {
  padding: 5px;
  margin-bottom: 10px;
}

.designer-tools .nav {
  font-size: 12px;
}

.scrolling-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.scrolling-container div {
  flex-grow: 1;
}

.palette-buttons {
  list-style-type: none;
  padding: 0px;
}

.palette-buttons li {
  margin-bottom: 4px;
  background-color: rgb(239, 239, 239);
  padding: 15px 5px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
}
.palette-buttons li.selected {
  background-color: rgb(160, 165, 151);
  color: #fff;
}
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { fabric } from 'fabric';
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
      highlightedPaper: null,
      paletteButtons: [
        { label: 'Size', target: 'size' },
        { label: 'Style', target: 'style' },
        { label: 'Text', target: 'text' },
        { label: 'Add images', target: 'images' },
        { label: 'Reset', target: 'reset' }
      ],
      selectedPalette: 'style',
      canvas: null,
      startPointX: 0,
      startPointY: 0
    };
  },

  computed: {
    ...mapState('products', [
      'patterns',
      'papers',
      'isLoading'
    ]),

    ...mapState('projects', [
      'project',
      'projectIsLoaded',
      'isValidProject'
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
    await this.getProject({ projectId: this.$route.params.id, queryParams: { type: 'template' } });

    window.addEventListener('resize', this.resizeCanvas, false);

    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');
    this.resizeCanvas();

    for (const i in this.project.design.design_elements) {
      this.placeNewElement(this.project.design.design_elements[i]);
    };
    // this.placeNewElement();

    console.log(JSON.stringify(this.canvas));
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
      'setProject',
      'setProjectProperty'
    ]),

    resizeCanvas() {
      const canvasWidth = document.getElementById('preview-pane').offsetWidth;
      const canvasHeight = document.getElementById('preview-pane').offsetHeight;
      this.canvas.setWidth(canvasWidth);
      this.canvas.setHeight(canvasHeight);
      this.canvas.renderAll();
      this.startPointX = canvasWidth / 2;
      this.startPointY = canvasHeight / 2;
    },

    highlightPattern (pattern) {
      this.highlightedPattern = pattern;
      this.highlightedPaper = null;
      console.log(pattern);
      this.selectPatternPaper();
    },

    highlightPaper (paper) {
      this.highlightedPattern = null;
      this.highlightedPaper = paper;
      console.log(paper);
      this.selectPatternPaper();
    },

    selectPatternPaper () {
      this.selectedPattern = this.highlightedPattern;
      this.selectedPaper = this.highlightedPaper;
      const updatedDesign = {};
      Object.assign(updatedDesign, this.project.design);
      updatedDesign.pattern = this.selectedPattern;
      updatedDesign.paper = this.selectedPaper;
      this.$store.commit('projects/setProjectProperty', { property: 'design', value: updatedDesign });
    },

    selectPalette (target) {
      if (target === 'reset') {
        if (confirm('Are you sure you want to reset your changes?')) {
          this.selectedPalette = 'style';
        }
      } else {
        this.selectedPalette = target;
      }
    },

    placeNewElement ({
      id = null,
      width = 150,
      height = 120,
      left = 0,
      top = 0,
      angle = 0
    }) {
      const rect = new fabric.Rect({
        id: id,
        left: left || this.startPointX - (width / 2),
        top: top || this.startPointY - (height / 2),
        originX: 'left',
        originY: 'top',
        width: width,
        height: height,
        angle: angle,
        fill: 'rgba(255,0,0,0.5)',
        transparentCorners: false
      });
      console.log(rect);
      this.startPointX += 10;
      this.startPointY += 10;
      this.canvas.add(rect).setActiveObject(rect);
    },

    saveDesign () {
      const updatedProject = Object.assign({}, this.project);
      const updatedDesign = Object.assign({}, this.project.design);
      const designElements = [];
      this.canvas.getObjects().forEach(function (element) {
        console.log(element);
        designElements.push({
          id: element.id,
          width: element.width,
          height: element.height,
          top: element.top,
          left: element.left,
          angle: element.angle
        });
      });
      this.$set(updatedDesign, 'design_elements', designElements);
      this.$set(updatedProject, 'design', updatedDesign);
      const payload = {
        projectId: this.project.id,
        project: updatedProject
      };
      this.updateProject(payload);
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
      this.$router.push(`/design/review/${this.project.id}`);
    }
  }
};
</script>
