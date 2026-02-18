import '@app/styles/globals.css';
import { i18nConfig } from '@configs/i18n.config';
import { getTranslation } from '@libs/get-translation';
import { dir } from 'i18next';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, ['common']);

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
  };
}

export default async function RootLayout({
  params,
  children,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>{children}</body>
    </html>
  );
}
