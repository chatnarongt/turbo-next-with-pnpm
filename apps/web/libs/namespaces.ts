import type { FlatNamespace } from 'i18next';

type IsUniqueTuple<
  T extends readonly unknown[],
  Seen = never,
> = T extends readonly [infer Head, ...infer Tail]
  ? Head extends Seen
    ? false
    : IsUniqueTuple<Tail, Seen | Head>
  : true;

type UniqueTuple<T extends readonly unknown[]> =
  IsUniqueTuple<T> extends true ? T : never;

/**
 * Creates a tuple of unique i18next namespaces.
 *
 * This function ensures that the provided namespaces are unique at the type level.
 * If duplicate namespaces are provided, a TypeScript error will be raised.
 *
 * @param args - The namespaces to include in the tuple.
 * @returns A tuple of unique namespaces.
 *
 * @example
 * ```ts
 * const namespaces = ns('common', 'home', 'about'); // Valid
 * const invalidNamespaces = ns('common', 'home', 'common'); // Type error: duplicate 'common'
 * ```
 */
export function ns<const T extends readonly FlatNamespace[]>(
  ...args: UniqueTuple<T>
): T {
  return args;
}
