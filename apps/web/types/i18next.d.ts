import 'i18next';
import type about from '@locales/en/about.json';
import type common from '@locales/en/common.json';
import type error404 from '@locales/en/error404.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: false;
    resources: {
      about: typeof about;
      common: typeof common;
      error404: typeof error404;
    };
  }
}
