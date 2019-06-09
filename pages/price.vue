<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-select
        :items="items"
        label="Standard"
        @change="refreshPrice"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',

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
