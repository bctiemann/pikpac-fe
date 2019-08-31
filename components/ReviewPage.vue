<template>
  <div v-if="projectIsLoaded && isValidProject" class="container">
    <div>
      <h2>Review your design</h2>
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
          <h3>{{ project.title }}</h3>
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
          <b-btn @click="editDesign">
            Edit Design
          </b-btn>
        </b-col>
      </b-row>
      <b-row class="d-flex w-100 justify-content-between">
        <div>
          <b-button to="/design">
            Choose another box
          </b-button>
        </div>
        <div>
          <b-button @click="updateProject({ projectId: project.id, project: project})">
            Save
          </b-button>
          <b-button @click="loginAndAddToCart">
            Add to cart &rarr;
          </b-button>
        </div>
      </b-row>
      </b-row>
    </div>
    <SignInModal :login-action="showModalAndAddToCart" />
    <AddedToCartModal />
  </div>
  <div v-else-if="!projectIsLoaded" class="container">
    Loading...
  </div>
  <div v-else-if="!isValidProject" class="container">
    Invalid project
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SignInModal from '~/components/SignInModal.vue';
import AddedToCartModal from '~/components/AddedToCartModal.vue';

export default {
  components: {
    SignInModal,
    AddedToCartModal
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

    ...mapState('design', [
      'design'
    ]),

    ...mapState('projects', [
      'project',
      'projectIsLoaded',
      'isValidProject'
    ]),

    ...mapGetters('players', [
    ]),

    user: {
      get () {
        return this.$auth.user;
      }
    }
  },

  async mounted () {
    // await this.getPatterns();
    // await this.getPapers();
    // console.log(this.$route.params.id);
    await this.getProject({ projectId: this.$route.params.id });
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

    ...mapActions('cart', [
      'addToCart'
    ]),

    editDesign () {
      if (this.project.type === 'template') {
        this.$router.push(`/design/editor/${this.$route.params.id}`);
      } else if (this.project.type === 'custom') {
        this.$router.push(`/design/custom/${this.$route.params.id}`);
      }
    },

    showModalAndAddToCart () {
      this.$bvModal.hide('sign-in');
      this.$bvModal.show('added-to-cart');
      this.addToCart(this.project);
    },

    loginAndAddToCart () {
      if (!this.user) {
        this.$bvModal.show('sign-in');
      } else {
        console.log('adding to cart');
        this.showModalAndAddToCart();
      }
    }
  }
};
</script>
