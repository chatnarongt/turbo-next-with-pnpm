'use client';

import { i18nConfig } from '@configs/i18n.config';
import { setCookie } from '@libs/set-cookie';
import { cn } from '@repo/class-merge';
import { usePathname, useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    setCookie({
      name: i18nConfig.localeCookie,
      value: newLocale,
      expires: date,
      path: '/',
    });

    if (i18nConfig.noPrefix) {
      // When noPrefix is true, stay on the same path and just refresh
      // The locale is determined by the cookie
      router.refresh();
      return;
    }

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      const newPath =
        currentPathname === '/'
          ? `/${newLocale}`
          : `/${newLocale}${currentPathname}`;
      router.push(newPath);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  const localeLabels: Record<string, string> = {
    en: 'English',
    th: 'ไทย',
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className={cn(
        'rounded-lg border py-2 pr-2 pl-1',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'border-gray-300 dark:border-gray-600',
        'hover:border-blue-500 focus:border-blue-500',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'transition-colors duration-200',
        'cursor-pointer',
        className,
      )}
    >
      {i18nConfig.locales.map((locale) => {
        return (
          <option key={locale} value={locale}>
            {localeLabels[locale] || locale}
          </option>
        );
      })}
    </select>
  );
}
