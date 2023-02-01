<template>
  <div class="organization-details flex column gap20">
    <div v-if="organization?.loggedAccountData?.status === 'pending'">
      <button @click="updateStatus('approved')">{{$t('approve')}}</button>
      <button @click="updateStatus('declined')">{{$t('decline')}}</button>
    </div>
    <div v-else-if="organization?.loggedAccountData?.status === 'approved'">
      <button @click="updateStatus('declined')">{{$t('Leave')}}</button>
    </div>
    <div class="flex gap5">
      <router-link v-if="organization" :to="{ name: 'OrganizationEdit', params: {id: organization._id} }"><button>{{$t('edit')}}</button></router-link>
      <button @click="removeOrganization">{{$t('delete')}}</button>
    </div>
    <section v-if="organization" class="flex column gap10">
      <h2>{{organization.name}}</h2>
      <div class="flex align-center gap10"><span>{{$t('createdBy')}}:</span> <span class="flex align-center gap5">{{organization.createdBy.username}} <Avatar :account="organization.createdBy"/></span></div>
      <div class="flex column gap10">
        <p>{{$t('yourRoles')}}: {{organization.loggedAccountData.roles.map(c => $t(c)).join(', ')}}</p>
      </div>
      <div class="flex column gap10">
        <p>{{$t('members')}}:</p>
        <ul class="flex column gap5">
          <li class="flex align-center gap5" v-for="member in organization.members" :key="member._id">
            <Avatar :account="member"/> {{member.username}} {{member.roles.map(c => $t(c)).join(', ')}}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Avatar from '@/modules/common/cmps/Avatar.vue';
import Loader from '@/modules/common/cmps/Loader.vue';

export default {
  name: 'OrganizationDetails',
  methods: {
    getOrganization() {
      this.$store.dispatch({ type: 'organization/loadOrganization', id: this.$route.params.id });
    },
    async removeOrganization() {
      await this.$store.dispatch({ type: 'organization/removeOrganization', id: this.organization._id });
      this.$router.push({name: 'ExamplePage'});
    },
    async updateStatus(newStatus) {
      await this.$store.dispatch({ type: 'organization/updateAccountStatus', organizationId: this.$route.params.id, accountId: this.loggedUser._id, newStatus });
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    organization() {
      return this.$store.getters['organization/selectedOrganization'];
    }
  },
  created() {
    this.getOrganization();
    localStorage.logged_organization_id = this.$route.params.id;
  },
  watch: {
    '$route.params.id'() {
      this.getOrganization();
    }
  },
  components: {
    Avatar,
    Loader
  }
}
</script>