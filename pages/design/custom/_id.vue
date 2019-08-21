<template>
  <div v-if="projectIsLoaded && isValidProject" class="container">
    <h2>Download template</h2>
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
        <EditableTitle :watch-load="true" :content="project.title" @update="text = $event" />
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
          {{ project.quantity }} pcs
        </div>
        <b-btn>
          Download template
        </b-btn>
        <b-btn @click="showUploadFileModal">
          Upload design file
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
        <b-button @click="submitDesign">
          Submit design &rarr;
        </b-button>
      </div>
    </b-row>
    <SignInModal :login-action="closeModal" />
    <UploadFileModal :handle-ok-action="submitDesignFile" />
  </div>
  <div v-else-if="!projectIsLoaded" class="container">
    Loading...
  </div>
  <div v-else-if="!isValidProject" class="container">
    Invalid project
  </div>
  <div v-else />
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SignInModal from '~/components/SignInModal.vue';
import UploadFileModal from '~/components/UploadFileModal.vue';
import EditableTitle from '~/components/EditableTitle.vue';

export default {
  middleware: 'auth',

  components: {
    SignInModal,
    UploadFileModal,
    EditableTitle
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
      'design',
      'designFile'
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

  watch: {
    loggedIn: function () {
      console.log('watch');
      return this.$auth.user;
    }
  },

  async mounted () {
    console.log(this.products);
    // await this.getPatterns();
    // await this.getPapers();
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

    ...mapActions('design', [
      'resetDesign',
      'setDesignProperty',
      'uploadDesignFile'
    ]),

    ...mapActions('projects', [
      'getProject',
      'updateProject'
    ]),

    loadProject () {
      this.getProject(this.$route.params.id);
    },

    showUploadFileModal () {
      this.$bvModal.show('upload-file');
    },

    async submitDesignFile () {
      const formData = new FormData();
      formData.append('design_file', this.designFile, this.designFile.name);
      formData.append('project_id', this.project.id);
      await this.uploadDesignFile(formData);
      this.$bvModal.hide('upload-file');
      this.$router.push('/design/review');
    },

    submitDesign () {
      this.$router.push('/design/review');
    },

    closeModal () {
      console.log('closing modal2');
      this.$bvModal.hide('sign-in');
    },

    startDesignProcess () {
      this.started = true;
      // this.resetDesign();
      // this.setDesignProperty({ property: 'title', value: 'Project name' });
      if (!this.user) {
        this.$bvModal.show('sign-in');
      }
    }
  }
};
</script>
