'use server';

import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function setCookie(options: ResponseCookie) {
  const cookieStore = await cookies();
  cookieStore.set(options);
}

export async function setCookies(options: ResponseCookie[]) {
  const cookieStore = await cookies();
  options.forEach((option) => {
    cookieStore.set(option);
  });
}
