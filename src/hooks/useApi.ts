import { useState, useCallback, useRef, useMemo } from "react";
import { api } from "../api/axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = unknown>(
  initialConfig?: AxiosRequestConfig
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Race condition 방지를 위한 요청 ID 추적
  const lastRequestId = useRef(0);

  const execute = useCallback(
    async (config?: AxiosRequestConfig): Promise<T | null> => {
      const requestId = ++lastRequestId.current;
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const mergedConfig = { ...initialConfig, ...config };
        const response = await api.request<T>(mergedConfig);

        // 마지막 요청만 상태 업데이트
        if (requestId === lastRequestId.current) {
          setState({ data: response.data, isLoading: false, error: null });
        }
        return response.data;
      } catch (err) {
        // 마지막 요청만 에러 상태 업데이트
        if (requestId === lastRequestId.current) {
          const error = err as AxiosError<{ message?: string }>;
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "요청 중 오류가 발생했습니다.";
          setState({ data: null, isLoading: false, error: errorMessage });
        }
        return null;
      }
    },
    [initialConfig]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// GET 요청 전용 훅
export function useGet<T = unknown>(url: string) {
  const config = useMemo(() => ({ method: "GET" as const, url }), [url]);
  return useApi<T>(config);
}

// POST 요청 전용 훅
export function usePost<T = unknown>(url: string) {
  const config = useMemo(() => ({ method: "POST" as const, url }), [url]);
  return useApi<T>(config);
}
