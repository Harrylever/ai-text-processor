import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generate16BitId = (): number => {
  return Math.floor(Math.random() * 65536) // 0 to 65535
}
