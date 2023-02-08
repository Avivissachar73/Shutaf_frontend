<template>
  <div class="organization-details flex column gap20">
    <div v-if="organization?.loggedAccountData?.status === 'pending'">
      <button class="btn mid primary" @click="updateStatus('approved')">{{$t('approve')}}</button>
      <button class="btn mid danger" @click="updateStatus('declined')">{{$t('decline')}}</button>
    </div>
    
    <nav v-if="orgId" class="flex align-center gap10">
      <router-link :to="{name: 'PostPage', params: {organizationId: orgId} }">{{$t('post.posts')}}</router-link>
      <router-link :to="{name: 'ShoppingListPage', params: {organizationId: orgId} }">{{$t('shoppingList.shoppingLists')}}</router-link>
    </nav>
    
    <section v-if="organization" class="flex column gap10">
      <h2>{{organization.name}}</h2>
      <p>{{organization.desc}}</p>
      <div class="flex align-center gap10"><span>{{$t('createdBy')}}:</span><MiniAccountPreview :reverse="true" :account="organization.createdBy"/></div>
      <div class="flex column gap10">
        <p>{{$t('organization.yourRoles')}}: {{organization.loggedAccountData.roles.map(c => $t(c)).join(', ')}}</p>
      </div>
      <div class="flex column gap10">
        <p>{{$t('organization.members')}}:</p>
        <ul class="flex column gap5">
          <li class="flex align-center gap5" v-for="member in organization.members" :key="member._id">
            <MiniAccountPreview :account="member"/> - {{member.roles.map(c => $t(c)).join(', ')}}
          </li>
        </ul>
      </div>
    </section>

    <div class="flex gap5" v-if="organization.loggedAccountData.roles.includes('admin')">
      <router-link  class="btn secondary" v-if="organization" :to="{ name: 'OrganizationEdit', params: {id: orgId} }">{{$t('edit')}}</router-link>
      <button class="btn danger" @click="removeOrganization">{{$t('delete')}}</button>
    </div>

    <div v-if="organization?.loggedAccountData?.status === 'approved'">
      <button @click="leaveOrg()" class="btn danger">{{$t('leave')}}</button>
    </div>
  </div>
</template>

<script>
import Loader from '@/modules/common/cmps/Loader.vue';
import MiniAccountPreview from '../../account/cmps/MiniAccountPreview.vue';
import { alertService } from '@/modules/common/services/alert.service';

export default {
  name: 'OrganizationDetails',
  methods: {
    getOrganization() {
      this.$store.dispatch({ type: 'organization/loadOrganization', id: this.orgId });
    },
    async removeOrganization() {
      await this.$store.dispatch({ type: 'organization/removeOrganization', id: this.orgId });
      this.$router.push({name: 'ExamplePage'});
    },
    async updateStatus(newStatus) {
      await this.$store.dispatch({ type: 'organization/updateAccountStatus', organizationId: this.orgId, accountId: this.loggedUser._id, newStatus });
    },
    async leaveOrg() {
      if (!await alertService.Confirm(this.$t('organization.alerts.confirmLeave'))) return;
      await this.updateStatus('left');
      this.$router.push({ name: 'HomePage' });
    }
  },
  computed: {
    orgId() {
      return this.$route.params.id;
    },
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    },
    organization() {
      return this.$store.getters['organization/selectedOrganization'];
    }
  },
  created() {
    this.getOrganization();
    localStorage.logged_organization_id = this.orgId;
  },
  watch: {
    'orgId'() {
      this.getOrganization();
    }
  },
  components: {
    Loader,
    MiniAccountPreview
  }
}
</script>