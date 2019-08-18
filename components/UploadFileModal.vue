<template>
  <b-modal
    id="upload-file"
    ref="upload-file"
    title="Upload Design File"
    @ok.prevent="handleOkAction"
  >
    <b-form-file
      v-model="designFile"
      :state="Boolean(designFile)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    />
  </b-modal>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
// import auth from '~/static/js/auth';

export default {
  components: {
  },

  props: {
    handleOkAction: {
      type: Function,
      default: () => null
    }
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState('cart', [
      'cart'
    ]),

    ...mapState('design', [
    ]),

    designFile: {
      get () { return this.$store.state.design.designFile; },
      set (value) { console.log(value); this.setDesignFile(value); }
    },

    invalidFeedbackDesignFile () {
      return '';
    }
  },

  methods: {
    ...mapActions('design', [
      'uploadDesignFile'
    ]),

    ...mapMutations('design', [
      'setDesignFile'
    ])
  }
};
</script>
