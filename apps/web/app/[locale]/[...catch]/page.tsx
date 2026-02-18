import LocaleSwitcher from '@components/locale-switcher';
import { TranslationProvider } from '@components/translation-provider';
import { getTranslation } from '@libs/get-translation';
import type { FlatNamespace } from 'i18next';

const ns = ['error404'] as const satisfies FlatNamespace[];

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/[...catch]'>) {
  const { locale } = await params;

  const { t } = await getTranslation(locale, ns);

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CatchAllNotFoundPage({
  params,
}: PageProps<'/[locale]/[...catch]'>) {
  const { locale } = await params;
  const { t, resources } = await getTranslation(locale, ns);

  return (
    <TranslationProvider locale={locale} namespaces={ns} resources={resources}>
      <div className="flex h-dvh w-screen flex-col items-center justify-center px-4 text-center md:px-8">
        <h1 className="font-bold text-4xl">{t('title')}</h1>
        <p className="mt-4">{t('description')}</p>
        <LocaleSwitcher className="mt-4" />
      </div>
    </TranslationProvider>
  );
}
