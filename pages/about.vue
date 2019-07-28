<template>
  <div class="container">
    <h1>About</h1>
    <b-row>
      <b-col sm="7">
        <b-img src="~/static/about.png" fluid-grow class="mb-5" />
      </b-col>
      <b-col sm="5">
        <h3>How It Works</h3>
        <div class="page-blurb">
          Pikpac is a design driven, online platform for custom printed packaging with low order minimums.
          Dedicated to making custom packaging easy and accessible for everyone, we've created an intuitive,
          step-by-step ordering process. Whether you're a first-time buyer, a business owner, an event planner
          or a savvy designer, Pikpac is the place for you.
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>
          Need more customization?
          Visit our sister studio.
          <a href="http://www.thinkpackage.com">
            Thinkpackage
          </a>
        </h3>
      </b-col>
    </b-row>
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
