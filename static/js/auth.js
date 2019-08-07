const auth = {
  async login($auth, email, password) {
    console.log('foo');
    console.log(this);
    // const { username, password } = this;
    try {
      await $auth
        .loginWith('local', {
          data: {
            email: email,
            password: password
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
};

export default auth;
