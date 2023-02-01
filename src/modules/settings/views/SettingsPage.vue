<template>
  <div class="settings-page flex column gap10">
    <pre>{{settings}}</pre>
    <form @submit.prevent="saveSettings">
      <FormInput label="Google API key" v-model="settings.GOOGLE_API_KEY"/>
      <button>{{$t('save')}}</button>
    </form>
    <FormInput placeholder="locale" :value="currLocale" type="select" :items="langs" @change="setLocale"/>
    <FormInput :label="$t('darkMode')" :value="isDarkMode" type="checkbox" @input="setDarkMode"/>
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
      currLocale: langs.find(c => c.value === this.$i18n.locale),
      locale: this.$i18n.locale,
      isDarkMode: (localStorage.isDarkMode === 'true') || false,
      settings: null
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = localStorage.locale = locale;
    },
    setDarkMode(val) {
      this.isDarkMode = val;
      localStorage.isDarkMode = val;
      evEmmiter.emit('set_darkmode', val);
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