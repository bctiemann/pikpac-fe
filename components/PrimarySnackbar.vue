<template>
  <v-snackbar
    v-model="visible"
    :color="snackbar.color"
    :bottom="true"
    :right="true"
    :timeout="timeout"
  >
    {{ snackbar.msg }}
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      timeout: 6000
    };
  },

  computed: {
    ...mapState(['snackbar']),

    visible: {
      get() {
        return !!this.snackbar.msg;
      },
      set(visible) {
        if (!visible) {
          this.unsetSnackbar();
        }
      }
    }
  },

  methods: {
    ...mapMutations(['unsetSnackbar'])
  }
};
</script>
