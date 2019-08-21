<template>
  <h3
    contenteditable="true"
    @input="update"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    watchLoad: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      initialValueSet: false
    };
  },

  computed: {
    ...mapState('projects', [
      // 'project'
    ]),

    projectTitle: {
      get () {
        return this.$store.state.projects.project.title;
      }
    }
  },

  watch: {
    projectTitle () {
      if (this.watchLoad && !this.initialValueSet) {
        console.log('resetting');
        this.$el.innerText = this.$store.state.projects.project.title;
        this.initialValueSet = true;
      }
    }
  },

  mounted () {
    console.log(this.content);
    this.$el.innerText = this.content;
    if (this.content) {
      this.initialValueSet = true;
    };
  },

  methods: {
    ...mapMutations('projects', [
      'setProjectProperty'
    ]),

    update () {
      console.log('update');
      this.setProjectProperty({ property: 'title', value: event.target.innerText });
      this.$emit('update', event.target.innerText);
    }
  }
};
</script>
