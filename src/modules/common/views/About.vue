<template>
  <div class="about-page container flex column gap30 height-all">
    <h2>{{$t('about.about')}}</h2>
    <p>{{$t('about.aboutUs')}}</p>
    <router-link :to="{name: 'MeatTheTeamPage'}"><h3>{{$t('about.meatTheTeam')}}</h3></router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>