<template>
  <div>
    <ul class="nav nav-pills nav-fill">
      <a class="">Pikpac</a>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/design" data-toggle="pill">
          Design a box
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/how-it-works" data-toggle="pill">
          How it works
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/faq" data-toggle="pill">
          FAQ
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" to="/account" data-toggle="pill">
          My account
        </nuxt-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><font-awesome-icon icon="shopping-basket" /></a>
      </li>
    </ul>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'attach_money',
          title: 'Price Check',
          to: '/price'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ThinkSmall'
    };
  }
};
</script>
