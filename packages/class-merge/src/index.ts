import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names intelligently.
 *
 * This utility combines clsx (for conditional classes) with tailwind-merge
 * (for intelligent Tailwind class merging). It handles:
 * - Conditional classes
 * - Array of classes
 * - Object notation
 * - Conflicting Tailwind classes (last one wins)
 *
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-2 removed)
 * cn('text-red-500', condition && 'text-blue-500') // => conditional
 * cn({ 'bg-blue-500': true, 'bg-red-500': false }) // => 'bg-blue-500'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
