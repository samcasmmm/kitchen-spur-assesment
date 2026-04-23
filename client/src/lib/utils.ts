import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-CA');
}

export function getDefaultDateRange() {
  const end = new Date();
  const start = new Date();

  start.setDate(end.getDate() - 6);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

export function formatDisplayDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

export function cleanParams<T extends Record<string, unknown>>(
  params: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  ) as Partial<T>;
}