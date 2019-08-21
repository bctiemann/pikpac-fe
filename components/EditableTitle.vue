<template>
  <!--
  <h3
    contenteditable="true"
    @input="update"
  />
  -->
  <!--<div>-->
  <!--title: {{ projectTitle }}-->
  <h3
    contenteditable="true"
    @input="update"
  />
  <!--</div>-->
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
        console.log('getter');
        console.log(this.$store.state.projects.projectTitle);
        return this.$store.state.projects.projectTitle;
      },
      set (value) {
        console.log('setter');
      }
    }
  },

  watch: {
    projectTitle () {
      console.log('hi');
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
