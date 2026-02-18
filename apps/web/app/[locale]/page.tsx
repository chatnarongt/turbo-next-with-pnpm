import LocaleSwitcher from '@components/locale-switcher';
import { TranslationProvider } from '@components/translation-provider';
import { getTranslation } from '@libs/get-translation';
import type { FlatNamespace } from 'i18next';
import TestLang from './test-lang.client';

const ns = ['common'] as const satisfies FlatNamespace[];

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  const { t, resources } = await getTranslation(locale, ns);

  return (
    <TranslationProvider locale={locale} namespaces={ns} resources={resources}>
      <div className="flex h-dvh w-screen flex-col items-center justify-center px-4 text-center md:px-8">
        <h1 className="font-bold text-4xl">{t('common:title')}</h1>
        <h2 className="mt-4 text-xl">{t('common:description')}</h2>
        <div className="mt-4">
          <LocaleSwitcher />
        </div>
        <TestLang />
      </div>
    </TranslationProvider>
  );
}
