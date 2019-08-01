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
            <li v-for="item in heading.items" :key="item.id" :class="{ hidden: !expandedItems[item.id] }" @click="toggleItem(item)">
              {{ item.title }}
              <div class="faq-item hidden">
                {{ item.body }}
              </div>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.faq-item {
  transition: .3s;
  max-height: 100vh;
  overflow: hidden;
}

.hidden .faq-item {
  max-height: 0px;
}
</style>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {},

  data: () => {
    return {
      expandedItems: {}
    };
  },

  computed: {
    ...mapState('faq', [
      'categories',
      'headings'
    ])
  },

  async mounted () {
    await this.getCategories();
    await this.getHeadings({ category: 1 });
  },

  methods: {
    ...mapActions('faq', [
      'getCategories',
      'getHeadings'
    ]),

    ...mapMutations('faq', [
    ]),

    toggleItem (item) {
      this.$set(this.expandedItems, item.id, !this.expandedItems[item.id]);
    }
  }

};
</script>
