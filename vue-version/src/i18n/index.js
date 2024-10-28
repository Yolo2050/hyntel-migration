import { createI18n } from 'vue-i18n'
import ko from './ko.json'
import en from './en.json'

export default createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: {
    ko,
    en
  }
})

