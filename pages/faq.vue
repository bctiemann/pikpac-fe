<template>
  <v-layout>
    FAQ
  </v-layout>
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
