import { useRef } from "react";
import { SomeFunction } from "@/types/debounce.interface";

export function useDebounce<T extends SomeFunction>(
  func: T,
  delay = 800
): T {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = ((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T;

  return debouncedFunction;
}