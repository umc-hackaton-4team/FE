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
  const lastRan = useRef<number>(0);
  const isFirstRun = useRef<boolean>(true);

  useEffect(() => {
    // 첫 실행 시 즉시 값 설정
    if (isFirstRun.current) {
      isFirstRun.current = false;
      lastRan.current = Date.now();
      return;
    }

    const now = Date.now();
    const elapsed = now - lastRan.current;
    const remaining = Math.max(0, limit - elapsed);

    const handler = setTimeout(() => {
      setThrottledValue(value);
      lastRan.current = Date.now();
    }, remaining);

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
