import { i18nConfig } from '@configs/i18n.config';
import type { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';

export function proxy(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    '/((?!api|static|locales|.*\\..*|_next).*)',
    { source: '/' }, // ← ensure root path is covered with basePath
  ],
};
