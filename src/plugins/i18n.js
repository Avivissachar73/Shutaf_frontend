import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/assets/locales/en';
import he from '@/assets/locales/he';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.locale || 'en',
  messages: {
    en,
    he
  }
});

export default i18n;
export const $t = str => i18n.t(str);