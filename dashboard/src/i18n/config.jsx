import { toAbsoluteUrl } from '@/utils';
import arMessages from './messages/ar.json';
import enMessages from './messages/en.json';
const I18N_MESSAGES = {
  en: enMessages,
  ar: arMessages,
};
const I18N_CONFIG_KEY = 'i18nConfig';
const I18N_LANGUAGES = [{
  label: 'English',
  code: 'en',
  direction: 'ltr',
  flag: toAbsoluteUrl('/media/flags/united-states.svg'),
  messages: I18N_MESSAGES.en
}, {
  label: 'Arabic (Saudi)',
  code: 'ar',
  direction: 'rtl',
  flag: toAbsoluteUrl('/media/flags/saudi-arabia.svg'),
  messages: I18N_MESSAGES.ar
}];
const I18N_DEFAULT_LANGUAGE = I18N_LANGUAGES[0];
export { I18N_CONFIG_KEY, I18N_DEFAULT_LANGUAGE, I18N_LANGUAGES, I18N_MESSAGES };
