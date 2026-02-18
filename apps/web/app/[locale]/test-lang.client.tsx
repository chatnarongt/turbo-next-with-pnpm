'use client';

import { useTranslation } from 'react-i18next';

export default function TestLang() {
  const { t } = useTranslation(['common']);

  return <h1 className="mt-12 font-bold text-4xl">CSR: {t('title')}</h1>;
}
