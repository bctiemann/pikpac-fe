<template>
  <v-app class="auth-layout">
    <v-content>
      <v-container fluid fill-height>
        <v-layout row align-center justify-center>
          <v-flex sm3>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <PrimarySnackbar />
  </v-app>
</template>

<script>
import PrimarySnackbar from '~/components/PrimarySnackbar.vue';

export default {
  components: {
    PrimarySnackbar
  }
};
</script>
