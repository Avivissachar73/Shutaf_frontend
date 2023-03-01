<template>
  <div class="settings-page flex column gap15">
    <h2>{{$t('settings.settings')}}</h2>
    <!-- <pre>{{settings}}</pre>
    <form @submit.prevent="saveSettings">
      <FormInput label="Google API key" v-model="settings.GOOGLE_API_KEY"/>
      <button>{{$t('save')}}</button>
    </form> -->
    <FormInput class="width-content gap10" labelholder="settings.locale" :value="currLocale" type="select" :items="langs" @change="setLocale"/>
    <FormInput class="width-content gap10" label="settings.darkMode" :value="uiConfig.darkMode" type="checkbox" @input="setDarkMode"/>
    <FormInput class="width-content gap10" label="settings.accessability" :value="uiConfig.accessabilityMode" type="checkbox" @input="setAccessabilityMode"/>
  </div>
</template>

<script>
import FormInput from '@/modules/common/cmps/FormInput.vue';
import evEmmiter from '@/modules/common/services/event-emmiter.service';

const langs = [{value: 'en', label: 'english'}, {value: 'he', label: 'hebrew'}];

export default {
  name: 'SettingsPage',
  data() {
    return {
      langs,
      currLocale: langs.find(c => c.value === this.$store.getters['settings/uiConfig'].locale),
      settings: null,
      uiConfig: {...this.$store.getters['settings/uiConfig']},
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters['auth/loggedUser'];
    }
  },
  methods: {
    setLocale(locale) {
      if (!locale) return;
      this.uiConfig.locale = locale;
      this.saveUiConfig();
    },
    setDarkMode(val) {
      this.uiConfig.darkMode = val;
      this.saveUiConfig();
    },
    setAccessabilityMode(val) {
      this.uiConfig.accessabilityMode = val;
      this.saveUiConfig();
    },
    saveUiConfig() {
      this.$store.dispatch({ type: 'settings/saveUiConfig', config: this.uiConfig });
      evEmmiter.emit('app_config_update', this.uiConfig);
    },
    async saveSettings() {
      const updatedSettings = await this.$store.dispatch({ type: 'settings/updateSettings', settings: this.settings });
      this.settings = JSON.parse(JSON.stringify(updatedSettings));
    }
  },
  created() {
    this.settings = JSON.parse(JSON.stringify(this.$store.getters['settings/settings']));
  },
  components: { FormInput }
}
</script>