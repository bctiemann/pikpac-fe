<template>
  <div class="container">
    <div v-if="!started || !user">
      <h1>Ready?</h1>
      <p class="page-blurb">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
      </p>
      <b-button @click="startDesignProcess">
        Start!
      </b-button>
      <b-row>
        <b-col />
        <b-col sm="5">
          <h3>Need help with anything?</h3>
          <b-button to="/faq">
            Go to FAQ
          </b-button>
          <b-button>Design help</b-button>
        </b-col>
        <b-col />
      </b-row>
    </div>
    <div v-else>
      <h2>Download template</h2>
      <p class="page-blurb">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis pharetra ultrices. Sed tempor pharetra eros, a lacinia sapien pellentesque.
      </p>
      <b-row v-if="isLoading">
        <b-col />
        <b-img src="~/static/loading_spinner.gif" />
        <b-col />
      </b-row>
      <b-row v-else>
        <b-col sm="7">
          <b-img src="~/static/folding_1pc-folding.png" fluid-grow class="mb-5" />
        </b-col>
        <b-col sm="5">
          <h3>{{ design.title }}</h3>
          <div class="project-data">
            00.00 cm x 00.00 cm x 00.00 cm
          </div>
          <div class="project-data">
            CMYK 4 color process print
          </div>
          <div class="project-data">
            Clear varnish / exterior of the box
          </div>
          <div class="project-data">
            0000 pcs
          </div>
        </b-col>
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
          <b-button @click="submitDesign">
            Submit design &rarr;
          </b-button>
        </div>
      </b-row>
    </div>
    <SignInModal :login-action="closeModal" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SignInModal from '~/components/SignInModal.vue';

export default {
  components: {
    SignInModal
  },

  data: () => {
    return {
      started: false,
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      selectedPattern: null,
      selectedPaper: null,
      highlightedPattern: null,
      highlightedPaper: null,
      loggedIn: false
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
      'project'
    ]),

    ...mapGetters('players', [
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    }
  },

  watch: {
    loggedIn: function () {
      console.log('watch');
      return this.$auth.user;
    }
  },

  mounted () {
    console.log(this.products);
    // await this.getPatterns();
    // await this.getPapers();
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
      'resetDesign',
      'setDesignProperty'
    ]),

    ...mapActions('projects', [
      'createProject'
    ]),

    submitDesign () {
      this.$router.push('/design/review');
    },

    async createProjectAndPush () {
      const project = {
        type: 'custom',
        title: this.project.product.name,
        product_id: this.project.product.id,
        unit_price: this.project.unitPrice,
        quantity: this.project.quantity
      };
      await this.createProject(project);
      console.log(this.project);
      this.$router.push(`/design/custom/${this.project.id}`);
    },

    closeModal () {
      console.log('closing modal2');
      this.$bvModal.hide('sign-in');
      this.createProjectAndPush();
    },

    startDesignProcess () {
      this.started = true;
      // this.resetDesign();
      // this.setDesignProperty({ property: 'title', value: 'Project name' });
      if (!this.user) {
        this.$bvModal.show('sign-in');
      } else {
        this.createProjectAndPush();
      }
    }
  }
};
</script>
