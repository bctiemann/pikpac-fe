<template>
  <footer class="footer">
    <b-container>
      <b-row>
        <b-col sm="2">
          <ul class="footer-links">
            <li>
              About
            </li>
            <li>
              How it works
            </li>
            <li>
              Products
            </li>
          </ul>
        </b-col>
        <b-col sm="2">
          <ul class="footer-links">
            <li>
              FAQ
            </li>
            <li>
              Sign in
            </li>
          </ul>
        </b-col>
        <b-col sm="2">
          <ul class="footer-links">
            <li>
              Privacy & terms
            </li>
            <li>
              Support
            </li>
          </ul>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="copyright">
            Copyright © Pikpac. All rights reserved.
          </div>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<style>
/* Sticky footer styles
-------------------------------------------------- */
html {
  /* position: relative;*/
  /* min-height: 100%;*/
}
body {
  /*margin-bottom: 240px;*/ /* Margin bottom by footer height */
}

.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.container {
  flex: 1;    /* same as flex-grow: 1; */
}

.footer {
  margin-top: 100px;
  /*
  position: absolute;
  bottom: 0;
  */
  /*height: 180px;*/ /* Set the fixed height of the footer here */
  width: 100%;
  background-color: #f5f5f5;
}

.footer-links {
  list-style-type: none;
  padding: 0px;
  margin-top: 48px;
}

.footer-links li {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
}

.copyright {
  margin-top: 114px;
  font-size: 12px;
  font-weight: 400;
}
</style>

<script>
</script>
