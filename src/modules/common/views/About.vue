<template>
  <div class="about-page container flex column gap30 height-all">
    <h2>{{$t('aboutPage.about')}}</h2>
    <p>{{$t('aboutPage.aboutUs')}}</p>
    <router-link :to="{name: 'MeatTheTeamPage'}"><h3>{{$t('aboutPage.meatTheTeam')}}!</h3></router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>