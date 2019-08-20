<template>
  <h3
    contenteditable="true"
    @input="update"
  />
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },

  data: () => {
    return {
      initialValueSet: false
    };
  },

  computed: {
    projectTitle: {
      get () {
        return this.$store.state.projects.project.title;
      }
    }
  },

  watch: {
    projectTitle () {
      if (!this.initialValueSet) {
        this.$el.innerText = this.$store.state.projects.project.title;
        this.initialValueSet = true;
      }
    }
  },

  methods: {
    ...mapMutations('projects', [
      'setProjectProperty'
    ]),

    update () {
      this.setProjectProperty({ property: 'title', value: event.target.innerText });
      this.$emit('update', event.target.innerText);
    }
  }
};
</script>
