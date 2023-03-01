<template>
  <div class="app-logo">Shu<span>taf</span></div>
</template>

<script>
export default {
  name: "AppLogo"
}
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@1,800&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Shantell+Sans:ital,wght@1,800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
.app-logo {
  // font-family: 'Courier New', Courier, monospace;
  // font-family: 'Shantell Sans', cursive;
  // font-family: 'Pacifico', cursive;
  font-family: 'Nanum Brush Script', cursive;
  font-weight: bold;
  font-size: 40px;
  display: inline-block;
  // color: #f9a825;
  // color: white;
  color: black;
  /* text-decoration: underline; */
  /* text-decoration-color: black; */
  // border-bottom: 2px solid #7f7f7f;
  // padding-bottom: .5px;
  // border-radius: 2.5px;
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