<template>
  <div class="app-logo">Shu<span>taf</span></div>
</template>

<script>
export default {
  name: "AppLogo"
}
</script>

<style>
.app-logo {
  font-family: 'Courier New', Courier, monospace;
  /* font-weight: bold; */
  font-size: 20px;
  display: inline-block;
  color: #f9a825;
  /* text-decoration: underline; */
  /* text-decoration-color: black; */
  border-bottom: 2px solid #7f7f7f;
  padding-bottom: .5px;
  border-radius: 2.5px;
}
.app-logo span {
    color: #f4511e;
    text-transform: lowercase;
    /* font-weight: 300; */
}
.app-logo span:before {
    content: '`';
    color: #7f7f7f;
}
</style>