'use client';

import { getTranslation } from '@libs/get-translation';
import { createInstance, type FlatNamespace, type Resource } from 'i18next';
import type { FC, PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

export interface TranslationProviderProps extends PropsWithChildren {
  locale: string;
  namespaces?: readonly FlatNamespace[];
  resources?: Resource;
}

export const TranslationProvider: FC<TranslationProviderProps> = ({
  children,
  locale,
  namespaces = [],
  resources,
}) => {
  const i18n = createInstance();

  getTranslation(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
