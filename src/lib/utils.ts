import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Слияние классов для shadcn/ui и animate-ui компонентов. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
