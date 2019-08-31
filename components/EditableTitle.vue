<template>
  <h3
    contenteditable="true"
    class="mb-0"
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
    },
    watchLoad: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
    };
  },

  computed: {
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
