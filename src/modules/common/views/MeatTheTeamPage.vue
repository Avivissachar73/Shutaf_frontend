<template>
  <div class="about-page container flex column gap30 height-all">
    <h2>{{$t('about.meatTheTeam')}}</h2>
    <ul class="flex column gap20">
      <li v-for="member in teamMembers" :key="member.name" class="flex gap15">
        <Avatar :account="member" :size="70"/>
        <div class="flex column gap15">
          <h3>{{member.name}}</h3>
          <h3>Roles: {{member.roles.join(', ')}}</h3>
          <h4>{{member.about}}</h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '../cmps/Avatar.vue'
export default {
  name: 'MeatTheTeamPage',
  components: { Avatar },
  data() {
    return {
      teamMembers: [
        {
          name: 'Daniel "" Nissani',
          roles: ['Founder', 'H.R'],
          about: 'Something about Danilo',
          img: 'https://scontent.ftlv1-1.fna.fbcdn.net/v/t31.18172-8/11112836_983502744993770_1522287892244446837_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=JJnoaPe5aGsAX_TU9pa&_nc_ht=scontent.ftlv1-1.fna&oh=00_AfAbg0uqfiAkNHgFdcDH_CAHNB-3NNojaJo7IoCFz0V2ZQ&oe=642C76FA',
        },
        {
          name: 'Keren "NORI" Barashi',
          roles: ['Founder', 'Head of fun', 'C.E.O'],
          about: 'Something about Nori',
          img: 'https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.6435-9/51492245_10217370509436001_730868799439372288_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2JJmMaB1my4AX9LwPcg&_nc_ht=scontent.ftlv1-1.fna&oh=00_AfBP6MUP8p58Wwn-wk-Lrb6IBcrvMX65Ko_ORTBcNLarOQ&oe=642C7FFB',
        },
        {
          name: 'Avner "MOOSHU" Cohen',
          roles: ['Junior software developer'],
          about: 'Something about avner',
          img: '',
        },
        {
          name: 'Aviv "SHUAL" Issachar',
          roles: ["C.T.O", 'Shual Al', 'Main developper', 'King of the andals and the first men', 'Protectore of the relm'],
          about: 'ABOUT ME',
          img: '',
        },
        {
          name: 'Daniel "WISSO" Wise',
          roles: ['undefined'],
          about: 'Has nothing to do with the application, been in the right place in the right time.\nWill have a major dramatic role in the upcoming movie of our story',
          img: '',
        },
        // {
        //   name: '',
        //   roles: [],
        //   about: '',
        //   img: '',
        // },
      ]
    }
  }
}
</script>