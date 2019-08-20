<template>
  <TemplatePage />
</template>

<style>
.faded {
  filter: opacity(60%);
  transition: .3s;
}
</style>

<script>
import TemplatePage from '~/components/TemplatePage.vue';

export default {
  components: {
    TemplatePage
  },

  data: () => {
    return {
    };
  }
};
</script>
