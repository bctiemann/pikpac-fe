<template>
  <div class="container">
    How It Works
  </div>
</template>

<script>
export default {
  components: {},

  data: () => {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ]
    };
  },

  methods: {
    refreshPrice (item) {
      console.log('foo');
    }
  }

};
</script>
