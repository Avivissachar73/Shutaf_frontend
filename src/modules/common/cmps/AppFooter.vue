<template>
  <footer class="app-footer flex-center">
    <h4 class="flex align-center gap5 wrap space-between">
      <CreditLogo/>
      © Aviv Issachar
      <a style="color: #feffbd;" :href="cvLink" target="_blank"><h3>- C.V -</h3></a>
    </h4>
  </footer>
</template>

<script>
import CreditLogo from './CreditLogo.vue'
export default {
  name: "AppFooter",
  components: { CreditLogo },
  data() {
    return {
      cvLink: 'https://docs.google.com/document/d/1chtvUmRJo38ZakzSWxqIyDgI6K1xi0eS/edit?usp=sharing&ouid=103323829961679615098&rtpof=true&sd=true'
    }
  }
}
</script>

<style>

</style>