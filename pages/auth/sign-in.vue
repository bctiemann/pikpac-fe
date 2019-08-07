<template>
  <b-card
    title="Sign In"
    class="mb-2"
  >
    <b-card-body>
      <AuthSignInCard />
      <b-container>
        <b-row>
          <b-col>
            <nuxt-link to="/auth/register/">
              Register
            </nuxt-link>
          </b-col>
          <b-col>
            <nuxt-link to="/auth/forgot/">
              <p class="text-xs-right">
                Forgot password?
              </p>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </b-card-body>
  </b-card>
</template>

<script>
import AuthSignInCard from '~/components/auth/AuthSignInCard.vue';
// import auth from '~/static/js/auth';

export default {
  layout: 'auth',
  components: {
    AuthSignInCard
  },

  methods: {
    async login () {
      console.log('foo1');
      console.log(this);
      // const { username, password } = this;
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .catch((error) => {
            console.log('error');
            console.log(error.request);
            this.error = JSON.parse(error.request.response);
          });
        this.$router.push('/account/orders');
      } catch (e) {
        console.log('caught error');
        this.error = e.response.data[0];
      }
    }
  }
};
</script>
