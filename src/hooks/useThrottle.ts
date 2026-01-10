import { useState, useEffect, useRef } from "react";

/**
 * 값의 변경 빈도를 제한하는 훅
 * 주로 스크롤 이벤트, 리사이즈 이벤트 등에서 사용
 *
 * @example
 * const [scrollY, setScrollY] = useState(0);
 * const throttledScrollY = useThrottle(scrollY, 100);
 *
 * useEffect(() => {
 *   const handleScroll = () => setScrollY(window.scrollY);
 *   window.addEventListener("scroll", handleScroll);
 *   return () => window.removeEventListener("scroll", handleScroll);
 * }, []);
 */
export function useThrottle<T>(value: T, limit: number = 100): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
