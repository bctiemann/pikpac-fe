<template>
  <div class="container">
    <b-row>
      <b-col sm="4">
        <ul>
          <li v-for="category in categories" :key="category.id" @click="getHeadings({ category: category.id })">
            {{ category.name }}
          </li>
          <li>
            Contact us
          </li>
        </ul>
      </b-col>
      <b-col sm="8">
        <h1>FAQ</h1>
        <div v-for="heading in headings" :key="heading.id" class="heading">
          {{ heading.title }}
          <ul>
            <li v-for="item in heading.items" :key="item.id">
              {{ item.title }}
              <div class="hidden">
                {{ item.body }}
              </div>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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

  computed: {
    ...mapState('faq', [
      'categories',
      'headings',
      'items'
    ])
  },

  async mounted () {
    await this.getCategories();
    await this.getHeadings({ category: 1 });
  },

  methods: {
    ...mapActions('faq', [
      'getCategories',
      'getHeadings',
      'getItems'
    ])
  }

};
</script>
