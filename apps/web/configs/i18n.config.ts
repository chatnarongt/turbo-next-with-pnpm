import type { Config as NextI18nRouterConfig } from 'next-i18n-router/dist/types';

type RequireNonNull<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

export const i18nConfig: RequireNonNull<NextI18nRouterConfig, 'localeCookie'> =
  {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    defaultLocale: 'en',
    locales: ['en', 'th'],
    noPrefix: true,
    localeCookie: '_lang',
  };
