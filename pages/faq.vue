<template>
  <div class="container">
    <h1>FAQ</h1>
    <b-row>
      <b-col sm="4">
        <ul class="faq-categories">
          <li v-for="category in categories" :key="category.id" @click="getHeadings({ category: category.id })">
            {{ category.name }}
          </li>
          <li>
            Contact us
          </li>
        </ul>
      </b-col>
      <b-col sm="8">
        <div
          v-for="heading in headings"
          :key="heading.id"
          :class="{ hidden: !expandedHeadings[heading.id] }"
          class="heading"
        >
          <div
            class="heading-click-target"
            @click="toggleHeading(heading)"
          >
            <b-row
              class="heading-title"
            >
              <b-col>
                {{ heading.title }}
              </b-col>
              <b-col sm="1">
                +
              </b-col>
            </b-row>
          </div>
          <ul class="faq-items">
            <li
              v-for="item in heading.items"
              :key="item.id"
              :class="{ hidden: !expandedItems[item.id] }"
            >
              <span
                class="faq-item-title"
                @click="toggleItem(item)"
              >
                {{ item.title }}
              </span>
              <div class="faq-item mb-3">
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
.faq-categories {
  list-style-type: none;
  padding: 0px;
  font-size: 16px;
  font-weight: 400;
  margin-top: 20px;
}

.faq-categories li {
  cursor: pointer;
  margin-bottom: 10px;
}

.faq-items,
.faq-item {
  transition: .3s;
  max-height: 100vh;
  overflow: hidden;
  margin: 0px;
}

.faq-items {
  list-style-type: none;
  padding: 0px;
}

.faq-item-title {
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
}

.faq-item {
  white-space: pre-line;
}

.heading.hidden .faq-items,
.hidden .faq-item {
  max-height: 0px;
}

.heading {
  border-bottom: 1px solid rgb(232, 219, 194);
}

.heading-click-target {
  padding: 20px 0px;
  cursor: pointer;
}

.heading-title {
  font-size: 28px;
  font-weight: 400;
}
</style>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {},

  data: () => {
    return {
      expandedHeadings: {},
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

    toggleHeading (heading) {
      this.$set(this.expandedHeadings, heading.id, !this.expandedHeadings[heading.id]);
    },

    toggleItem (item) {
      this.$set(this.expandedItems, item.id, !this.expandedItems[item.id]);
    }
  }

};
</script>
